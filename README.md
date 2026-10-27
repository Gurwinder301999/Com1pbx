# Com1 — IP PBX website

A Python (Flask) + HTML + CSS + JavaScript site for Com1 — native IP PBX, call
centre automation, IP paging and gateways.

The layout and palette follow the supplied reference design: off-white canvas,
near-black ink, hairline dividers, oversized tight display type, pill buttons, a
four-up feature strip and a dark call-to-action band.

Product names, categories, brands, images and published specifications come from
the public catalogue at [com1pbx.com](https://com1pbx.com).

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open <http://localhost:8000>.

To change the port: `PORT=5000 python app.py`.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, four-up feature strip, featured Com1 IP PBX block with the Genie dashboard, catalogue preview, dark CTA band, brand strip |
| `/products` | Catalogue with category pills, brand pills and live text filter |
| `/products/<slug>` | Product detail — highlights, specification table, features, related models |
| `/solutions` | IP PBX, call centre suite, IP paging, bridge conferencing, ticketing, gateways, plus the predictive / progressive / preview comparison |
| `/contact` | Enquiry form, direct contacts, dealer network |
| `/api/products` | JSON catalogue, filterable with `?category=` and `?brand=` |

## Structure

```
app.py                  routes, filtering, enquiry handling, JSON endpoint
data.py                 all content and the product catalogue
templates/
  base.html             shell: header, nav, footer, flash messages
  _macros.html          icon, media and product-card macros
  index.html            landing page
  products.html         catalogue with filters
  product.html          product detail
  solutions.html        solutions and dialing-mode comparison
  contact.html          enquiry form and contacts
  404.html              not found
static/css/style.css    the whole design system, tokens at the top
static/js/main.js       mobile nav, sticky header, scroll reveal, live filter
```

## Editing

- **Add or change a product** — edit `PRODUCTS` in `data.py`. Every entry needs
  `slug`, `name`, `brand`, `category`, `summary`; the rest is optional and the
  templates degrade gracefully (`specs` empty shows a "datasheet on request"
  notice, `image` empty shows a typographic tile).
- **Colours and spacing** — the `:root` block at the top of `style.css`.
- **Categories** — `CATEGORIES` in `data.py`. Categories with no products are
  hidden from the filter pills and listed under "Also supplied" instead.

## Notes

- Product images are hot-linked from the com1pbx.com CDN. If an image cannot
  load, the card falls back to a typographic tile rather than showing a broken
  image.
- Specification tables are only reproduced where the source page publishes them.
  Other models show a "full datasheet on request" notice instead of invented
  numbers.
- The enquiry form validates and confirms in-page. Wire the `POST` branch in
  `contact()` to your mail provider or CRM before going live.
