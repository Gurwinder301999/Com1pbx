# Deploying the Com1 site to a server

The app is a single Flask process served by gunicorn behind nginx. No database,
no build step — gunicorn starts serving the moment the dependencies are installed.
Target: a 1 GB Ubuntu 22.04/24.04 VPS is plenty.

Three routes below. Pick one.

---

## Option A — Ubuntu VPS with nginx + systemd (recommended for your own server)

### 1. System packages

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nginx git
```

### 2. Service user and code

```bash
sudo useradd --system --create-home --shell /usr/sbin/nologin com1
sudo mkdir -p /opt/com1
sudo chown com1:com1 /opt/com1

sudo -u com1 git clone https://github.com/Gurwinder301999/Com1pbx.git /opt/com1
cd /opt/com1
```

If the repo is private, add a deploy key for the `com1` user first
(`ssh-keygen -t ed25519`, then paste the public key into the repo's
Settings → Deploy keys).

### 3. Virtualenv and dependencies

```bash
sudo -u com1 python3 -m venv /opt/com1/.venv
sudo -u com1 /opt/com1/.venv/bin/pip install --upgrade pip
sudo -u com1 /opt/com1/.venv/bin/pip install -r /opt/com1/requirements.txt -r /opt/com1/requirements-prod.txt
```

### 4. Environment file

```bash
sudo -u com1 cp /opt/com1/.env.example /opt/com1/.env
python3 -c "import secrets; print(secrets.token_urlsafe(48))"   # copy the output
sudo -u com1 nano /opt/com1/.env
```

Set `SECRET_KEY` to that token. Leave `GUNICORN_BIND=127.0.0.1:8000` because nginx
is in front. `chmod 600 /opt/com1/.env`.

### 5. systemd unit

```bash
sudo cp /opt/com1/deploy/com1.service /etc/systemd/system/com1.service
sudo systemctl daemon-reload
sudo systemctl enable --now com1
systemctl status com1 --no-pager
```

Smoke-test the app directly before touching nginx:

```bash
curl -s localhost:8000/health      # {"products":88,"status":"ok"}
```

### 6. nginx

```bash
sudo cp /opt/com1/deploy/nginx.conf /etc/nginx/conf.d/com1pbx.conf
```

Edit the domain and certificate paths in that file, then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 7. TLS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d com1pbx.com -d www.com1pbx.com
```

Certbot rewrites the nginx config and installs a renewal timer. Verify with
`sudo certbot renew --dry-run`.

### 8. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Port 8000 stays bound to `127.0.0.1`, so it is never exposed directly.

### Updating later

```bash
cd /opt/com1
sudo -u com1 git pull
sudo -u com1 .venv/bin/pip install -r requirements.txt -r requirements-prod.txt
sudo systemctl reload com1       # graceful: workers finish in-flight requests
```

---

## Option B — Docker

```bash
cp .env.example .env
python3 -c "import secrets; print(secrets.token_urlsafe(48))"   # paste into SECRET_KEY
docker compose up -d --build
docker compose ps
curl -s localhost:8000/health
```

The container runs as UID 10001, has a `HEALTHCHECK` on `/health`, and restarts
unless stopped. To add nginx + TLS as containers:

```bash
docker compose --profile proxy up -d
```

`docker-compose.yml` binds the app to `127.0.0.1:8000` only; nginx publishes
80/443.

---

## Option C — PaaS (Render, Railway, Fly.io, Heroku)

The repo already contains `Procfile` and `wsgi.py`, so these platforms detect it
automatically:

- **Build:** `pip install -r requirements.txt -r requirements-prod.txt`
- **Start:** `gunicorn -c gunicorn.conf.py wsgi:app` (the `Procfile` does this)
- **Env vars:** `FLASK_ENV=production`, `SECRET_KEY=<token>`

Fly.io: `fly launch`, then `fly secrets set SECRET_KEY=...`, then `fly deploy`.
Render: New → Web Service → point at the repo, add the env vars above.

---

## What "production mode" changes

Set by `FLASK_ENV=production` in `app.py`:

| Behaviour | Effect |
| --- | --- |
| Default secret key | **Refuses to boot** — you must set `SECRET_KEY` |
| `SESSION_COOKIE_SECURE` | Session cookies only over HTTPS |
| `PREFERRED_URL_SCHEME` | `url_for(_external=True)` emits `https://` |
| Template auto-reload | Off |
| Proxy headers | `ProxyFix` trusts one nginx hop, so client IPs and scheme are correct |

Also applied on every response: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`. Static assets get
`Cache-Control: public, max-age=604800, immutable`; HTML is `no-cache`.

---

## Operational notes

**Logs**

```bash
sudo journalctl -u com1 -f          # systemd
docker compose logs -f web          # docker
```

**Health check** — `/health` returns `{"products":88,"status":"ok"}`. Point your
uptime monitor at it; the Dockerfile's `HEALTHCHECK` uses it.

**Backups** — there is no datastore. The only state is the code and `.env`, so
`git` plus your secret store is the whole backup story.

**Enquiries are not emailed yet.** `contact()` in `app.py` validates and flashes a
confirmation, but nothing is delivered. Before launch, wire that branch to SMTP,
SES, or a CRM webhook — otherwise enquiries are silently lost.

**Product images** are hot-linked from `website.com1pbx.com`. That is fine while
the upstream is up, and every card falls back to a typographic tile if it is not.
For a fully independent deployment, copy the images into `static/` and change the
`IMG` constant at the top of `data.py`.

**Search engines** — `/sitemap.xml` (101 URLs) and `/robots.txt` are generated
from the catalogue. After launch, submit
`https://com1pbx.com/sitemap.xml` in Google Search Console.

**Scaling** — the app is stateless, so raise `WEB_CONCURRENCY` (2 × cores + 1) or
run several containers behind the load balancer.
