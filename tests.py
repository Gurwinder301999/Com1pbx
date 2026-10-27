"""Smoke tests for the Com1 site.

    python tests.py
"""

import sys
import unicodedata

from app import app
from data import CATEGORIES, PRODUCTS, PRODUCTS_BY_SLUG

FAILURES = []


def check(label, condition, detail=""):
    if condition:
        print("  ok   {}".format(label))
    else:
        print("  FAIL {}".format(label) + (" — " + detail if detail else ""))
        FAILURES.append(label)


def main():
    client = app.test_client()

    print("\nRoutes")
    routes = [
        "/",
        "/products",
        "/solutions",
        "/contact",
        "/api/products",
        "/health",
        "/robots.txt",
        "/sitemap.xml",
    ]
    for route in routes:
        response = client.get(route)
        check("GET {} -> 200".format(route), response.status_code == 200, str(response.status_code))

    for category in CATEGORIES:
        response = client.get("/products?category=" + category["slug"])
        html = response.get_data(as_text=True)
        expected = sum(1 for item in PRODUCTS if item["category"] == category["slug"])
        rendered = html.count('class="card reveal"')
        check(
            "category {} renders {} cards".format(category["slug"], expected),
            response.status_code == 200 and rendered == expected,
            "got {}".format(rendered),
        )

    print("\nEvery product page")
    broken = []
    for item in PRODUCTS:
        response = client.get("/products/" + item["slug"])
        if response.status_code != 200:
            broken.append(item["slug"])
    check("all {} product pages render".format(len(PRODUCTS)), not broken, ", ".join(broken[:5]))

    print("\nFilters")
    yealink = client.get("/products?brand=Yealink").get_data(as_text=True)
    check("brand filter narrows results", "Yealink CP965" in yealink and "Dinstar MTG5000" not in yealink)

    search = client.get("/products?q=gateway").get_data(as_text=True)
    check("text search matches", "DAG1000-4S" in search)

    empty = client.get("/products?q=zzzznothing").get_data(as_text=True)
    check("no-match shows empty state", "Nothing listed here yet" in empty or "No products match" in empty)

    print("\n404 handling")
    check("unknown slug -> 404", client.get("/products/does-not-exist").status_code == 404)
    check("unknown category -> 404", client.get("/products?category=nope").status_code == 404)
    check("unknown path -> 404", client.get("/no-such-page").status_code == 404)

    print("\nEnquiry form")
    ok = client.post(
        "/contact",
        data={"name": "Ravi", "email": "ravi@example.com", "message": "50 IP phones", "interest": "CP965"},
        follow_redirects=True,
    )
    check("valid enquiry confirms", "Thanks Ravi" in ok.get_data(as_text=True))

    blank = client.post(
        "/contact", data={"name": "", "email": "", "message": ""}, follow_redirects=True
    )
    check("blank enquiry rejected", "Please add your name" in blank.get_data(as_text=True))

    bad = client.post(
        "/contact", data={"name": "A", "email": "nope", "message": "hi"}, follow_redirects=True
    )
    check("malformed email rejected", "does not look right" in bad.get_data(as_text=True))

    print("\nMarkup quality")
    for route in ["/", "/products", "/products/yealink-cp965-conference", "/solutions", "/contact"]:
        html = client.get(route).get_data(as_text=True)
        check("{} has no unrendered Jinja".format(route), "{{" not in html and "{%" not in html)
        check("{} has no None leak".format(route), ">None<" not in html)

    print("\nData integrity")
    slugs = [item["slug"] for item in PRODUCTS]
    check("no duplicate slugs", len(slugs) == len(set(slugs)))
    check("all categories exist", all(i["category"] in {c["slug"] for c in CATEGORIES} for i in PRODUCTS))
    check("all lookups resolve", all(PRODUCTS_BY_SLUG[s]["slug"] == s for s in slugs))
    check(
        "no mojibake in copy",
        not any("\u00e2" in (i["summary"] + i["description"]) for i in PRODUCTS),
    )

    print("\nAPI")
    payload = client.get("/api/products?category=pri-gateways").get_json()
    check("api filters by category", payload["count"] == 8, str(payload["count"]))
    check("api payload shape", {"slug", "name", "brand", "image", "url"} <= set(payload["products"][0]))

    print()
    if FAILURES:
        print("FAILED: {} check(s)\n".format(len(FAILURES)))
        for failure in FAILURES:
            print("  - " + failure)
        return 1

    print("All checks passed — {} products across {} categories.\n".format(len(PRODUCTS), len(CATEGORIES)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
