# Com1 — IP PBX website

A Python (Flask) + HTML + CSS + JavaScript site for Com1 — native IP PBX, call
centre automation, IP paging, conferencing and gateways.

The layout and palette follow the supplied reference design: off-white canvas,
near-black ink, hairline dividers, oversized tight display type, pill buttons, a
four-up feature strip and a dark call-to-action band.

Product names, categories, brands, images and published specifications come from
the public catalogue at [com1pbx.com](https://com1pbx.com): **88 products across
all 9 categories**.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open <http://localhost:8000>. Change the port with `PORT=5000 python app.py`.

That is the development server only. **To run this on your own server, see
[DEPLOY.md](DEPLOY.md)** — nginx + systemd, Docker, or a PaaS, with TLS.

Production, in brief:

```bash
cp .env.example .env            # then set SECRET_KEY
pip install -r requirements.txt -r requirements-prod.txt
gunicorn -c gunicorn.conf.py wsgi:app
```

Production mode refuses to boot without a `SECRET_KEY`, marks session cookies
`Secure`, and builds all external URLs over `https` behind the proxy.


## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, four-up feature strip, featured Com1 IP PBX block with the Genie dashboard, six catalogue picks, dark CTA band, brand strip |
| `/products` | Full catalogue with category pills, brand pills, live text filter and sort |
| `/products/<slug>` | Product detail — highlights, specification table, features, related models |
| `/solutions` | IP PBX, call centre suite, IP paging, bridge conferencing, ticketing, gateways, plus the predictive / progressive / preview comparison |
| `/contact` | Enquiry form, direct contacts, dealer network |
| `/api/products` | JSON catalogue, filterable with `?category=` and `?brand=` |
| `/sitemap.xml`, `/robots.txt` | SEO endpoints, generated from the catalogue |
| `/health` | Uptime/status JSON |

## Catalogue coverage

| Category | Models |
| --- | --- |
| IP Phones | 27 — Yealink, Snom, Fanvil, Grandstream |
| GSM Gateways | 7 — Dinstar UC2000 family |
| FXS Gateways | 11 — Dinstar DAG1000 / DAG2000 / DAG3000 |
| FXO Gateways | 9 — Dinstar DAG1000 / DAG2000 / DAG3000 |
| PRI Gateways | 8 — Dinstar MTG series, Matrix SETU-VTEP |
| PA Gateways | 1 — Fanvil PA2S |
| IP PA Speakers | 15 — Com1 CM series (10 W to 120 W) |
| IP Intercom | 3 — Com1 CM-IND series |
| Emergency Call Box | 7 — Com1 CM-ECB series |

## Structure

```
app.py                  routes, filtering, enquiry handling, JSON/SEO endpoints,
                        production hardening (ProxyFix, headers, caching, guards)
data.py                 all content and the product catalogue
wsgi.py                 WSGI entry point for gunicorn
gunicorn.conf.py        worker/timeout/logging config, env-overridable
tests.py                smoke tests: routes, filters, form, markup, data integrity
Dockerfile              production image, non-root, healthcheck
docker-compose.yml      web service + optional nginx/TLS profile
Procfile                PaaS start command
.env.example            environment template
DEPLOY.md               full server deployment guide
deploy/nginx.conf       reverse proxy, TLS, static caching, error page
deploy/com1.service     systemd unit, hardened
templates/              Jinja templates (see below)
static/css/style.css    the whole design system, tokens at the top
static/js/main.js       mobile nav, sticky header, scroll reveal, live filter, sort
static/50x.html         standalone page nginx serves if the app is down
```

## Tests

```bash
python tests.py
```

Covers every route, all 88 product pages, every category, brand and text
filters, 404s, the enquiry form (valid, blank, malformed email), unrendered
Jinja, `None` leaks, duplicate slugs and the JSON API. Currently: all checks
pass.

## Editing

- **Add or change a product** — edit `PRODUCTS` in `data.py`. Required keys are
  `slug`, `name`, `brand`, `category`, `summary`; everything else is optional and
  the templates degrade gracefully (`specs` empty shows a "datasheet on request"
  notice, `image` empty shows a typographic tile).
- **Colours and spacing** — the `:root` block at the top of `style.css`.
- **Categories and brands** — `CATEGORIES` and `BRANDS` in `data.py`. Categories
  with no products drop out of the filter pills and are listed under "Also
  supplied" instead.

## Notes

- Product images are hot-linked from the com1pbx.com CDN. If an image cannot
  load, the card falls back to a typographic tile rather than a broken image.
- Specification tables are only reproduced where the source page publishes them.
  Other models show a "full datasheet on request" notice instead of invented
  numbers.
- The enquiry form validates and confirms in-page. Wire the `POST` branch in
  `contact()` to your mail provider or CRM before going live.
