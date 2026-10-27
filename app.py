"""Com1 website - Flask application.

Routes
    /                    landing page (hero, feature strip, featured platform, range)
    /products            catalogue with category, brand and text filters
    /products/<slug>     product detail with highlights, specs and features
    /solutions           platform and solution overview
    /contact             enquiry form, direct contacts, dealer network
    /api/products        JSON catalogue (used by the live search, handy for tests)

Run locally:  python app.py     ->  http://localhost:8000
"""

import os

from flask import (
    Flask,
    abort,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    url_for,
)

from data import (
    BRANDS,
    CATEGORIES,
    CATEGORIES_BY_SLUG,
    COMPANY,
    DASHBOARD_ROWS,
    DEALERS,
    DEPLOYMENTS,
    DIALING_MODES,
    FEATURE_STRIP,
    HERO,
    PLATFORM_SPECS,
    PRODUCTS,
    PRODUCTS_BY_SLUG,
    SOLUTIONS,
    STATS,
    brand_counts,
    category_counts,
)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "com1-local-development-key")

# ---------------------------------------------------------------- production
# Behind nginx / a load balancer, trust the forwarded headers so url_for()
# builds https links and the real host name.
if os.environ.get("TRUST_PROXY", "1") == "1":
    from werkzeug.middleware.proxy_fix import ProxyFix

    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

IS_PROD = os.environ.get("FLASK_ENV", "").lower() in ("production", "prod")

app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=IS_PROD,
    PERMANENT_SESSION_LIFETIME=60 * 60 * 8,
    MAX_CONTENT_LENGTH=1 * 1024 * 1024,  # enquiry form is small; cap the body
    PREFERRED_URL_SCHEME="https" if IS_PROD else "http",
    TEMPLATES_AUTO_RELOAD=not IS_PROD,
)

if IS_PROD and app.secret_key == "com1-local-development-key":
    raise RuntimeError(
        "Refusing to start in production with the default secret key. "
        "Set the SECRET_KEY environment variable."
    )


@app.after_request
def add_headers(response):
    """Security headers plus long-lived caching for static assets."""
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault(
        "Permissions-Policy", "geolocation=(), microphone=(), camera=()"
    )

    if request.path.startswith("/static/"):
        response.headers["Cache-Control"] = "public, max-age=604800, immutable"
    elif request.endpoint in ("sitemap", "robots", "health"):
        response.headers["Cache-Control"] = "public, max-age=3600"
    else:
        response.headers.setdefault("Cache-Control", "no-cache")

    return response



@app.context_processor
def inject_globals():
    counts = category_counts()
    brands = brand_counts()

    # Only offer filters that actually have products behind them.
    live_categories = [c for c in CATEGORIES if counts.get(c["slug"], 0)]
    other_categories = [c for c in CATEGORIES if not counts.get(c["slug"], 0)]

    return {
        "company": COMPANY,
        "categories": live_categories,
        "all_categories": CATEGORIES,
        "other_categories": other_categories,
        "brands": [b for b in BRANDS if brands.get(b)],
        "counts": counts,
        "brand_counts": brands,
        "feature_strip": FEATURE_STRIP,
        "total_products": len(PRODUCTS),
    }


@app.route("/")
def index():
    featured = [item for item in PRODUCTS if item["featured"]]
    # Six picks so the three-column grid fills two clean rows.
    spotlight_slugs = [
        "yealink-cp965-conference",
        "fanvil-a320",
        "grandstream-grp2670",
        "snom-d815w",
        "com1-cm-30hsr",
        "dinstar-uc2000-vf-8",
    ]
    spotlight = [PRODUCTS_BY_SLUG[s] for s in spotlight_slugs if s in PRODUCTS_BY_SLUG]
    hero_image = PRODUCTS_BY_SLUG["yealink-cp965-conference"]["image"]
    band_image = PRODUCTS_BY_SLUG["grandstream-grp2670"]["image"]

    return render_template(
        "index.html",
        hero=HERO,
        stats=STATS,
        deployments=DEPLOYMENTS,
        platform_specs=PLATFORM_SPECS,
        dashboard_rows=DASHBOARD_ROWS,
        featured=featured,
        spotlight=spotlight,
        hero_image=hero_image,
        band_image=band_image,
        dialing_modes=DIALING_MODES,
    )


@app.route("/products")
def products():
    category = request.args.get("category", "").strip()
    brand = request.args.get("brand", "").strip()
    query = request.args.get("q", "").strip()
    sort = request.args.get("sort", "").strip()

    if category and category not in CATEGORIES_BY_SLUG:
        abort(404)

    items = list(PRODUCTS)

    if category:
        items = [i for i in items if i["category"] == category]
    if brand:
        items = [i for i in items if i["brand"].lower() == brand.lower()]
    if query:
        needle = query.lower()
        items = [
            i
            for i in items
            if needle in (i["name"] + " " + i["brand"] + " " + i["summary"] + " " + " ".join(i["tags"])).lower()
        ]
    if sort == "brand":
        items.sort(key=lambda i: (i["brand"], i["name"]))
    elif sort == "name":
        items.sort(key=lambda i: i["name"])

    return render_template(
        "products.html",
        products=items,
        active_category=category,
        active_brand=brand,
        query=query,
        sort=sort,
        category_meta=CATEGORIES_BY_SLUG.get(category),
    )


@app.route("/products/<slug>")
def product(slug):
    item = PRODUCTS_BY_SLUG.get(slug)
    if item is None:
        abort(404)

    related = [
        other
        for other in PRODUCTS
        if other["category"] == item["category"] and other["slug"] != slug
    ][:3]

    return render_template(
        "product.html",
        product=item,
        related=related,
        category_meta=CATEGORIES_BY_SLUG.get(item["category"]),
    )


@app.route("/solutions")
def solutions():
    return render_template(
        "solutions.html",
        solutions=SOLUTIONS,
        dialing_modes=DIALING_MODES,
        dashboard_rows=DASHBOARD_ROWS,
    )


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()
        interest = request.form.get("interest", "").strip()

        if not name or not email or not message:
            flash("Please add your name, email and a short message.", "error")
        elif "@" not in email or "." not in email.split("@")[-1]:
            flash("That email address does not look right.", "error")
        else:
            # Replace this with a mail provider or CRM call before going live.
            flash(
                "Thanks {} - your enquiry{} is logged. The Com1 team replies within "
                "one business day.".format(
                    name, " about " + interest if interest else ""
                ),
                "success",
            )
            return redirect(url_for("contact"))

    return render_template(
        "contact.html",
        dealers=DEALERS,
        preselect=request.args.get("product", ""),
    )


@app.route("/api/products")
def api_products():
    category = request.args.get("category", "").strip()
    brand = request.args.get("brand", "").strip()

    items = PRODUCTS
    if category:
        items = [i for i in items if i["category"] == category]
    if brand:
        items = [i for i in items if i["brand"].lower() == brand.lower()]

    return jsonify(
        {
            "count": len(items),
            "products": [
                {
                    "slug": i["slug"],
                    "name": i["name"],
                    "brand": i["brand"],
                    "category": i["category"],
                    "summary": i["summary"],
                    "image": i["image"],
                    "url": url_for("product", slug=i["slug"]),
                }
                for i in items
            ],
        }
    )


@app.route("/health")
def health():
    return jsonify({"status": "ok", "products": len(PRODUCTS)})


@app.route("/robots.txt")
def robots():
    body = "User-agent: *\nAllow: /\nSitemap: {}\n".format(
        url_for("sitemap", _external=True)
    )
    return app.response_class(body, mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap():
    pages = [
        (url_for("index"), "1.0"),
        (url_for("products"), "0.9"),
        (url_for("solutions"), "0.8"),
        (url_for("contact"), "0.7"),
    ]
    for category in CATEGORIES:
        pages.append((url_for("products", category=category["slug"]), "0.7"))
    for item in PRODUCTS:
        pages.append((url_for("product", slug=item["slug"]), "0.6"))

    xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for loc, priority in pages:
        xml.append(
            "  <url><loc>{}</loc><priority>{}</priority></url>".format(
                url_for("index", _external=True).rstrip("/") + loc, priority
            )
        )
    xml.append("</urlset>")

    return app.response_class("\n".join(xml), mimetype="application/xml")


@app.errorhandler(404)
def not_found(_error):
    return render_template("404.html"), 404


@app.errorhandler(500)
def server_error(_error):
    return render_template("500.html"), 500



if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "8000")),
        debug=False,
        threaded=True,
    )
