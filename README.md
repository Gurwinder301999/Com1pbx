# Comone Hardware Appliance

A responsive, single-page presentation focused on the **Hardware Appliance** section of the [Comone IP-based PA system page](https://com1pbx.com/com1-ippbx-solution-ip-based-pa-system). It includes component details, workload guidance, ordering options, and configuration details to confirm with the supplier. Hardware imagery is illustrative, not product photography.

## Run locally

```sh
npm ci
npm run dev
```

Use Node.js 20.19+ on the 20.x line, 22.12+ on the 22.x line, or 24+. To create a production build, run `npm run build`; preview it with `npm run preview`. Run `npm test` to check the site assets, specifications, and accessibility-related fallbacks.

## Design resources

The selections below come from [Design Resources for Developers](https://github.com/bradtraversy/design-resources-for-developers):

- **React UI:** [React Bootstrap](https://react-bootstrap.github.io/) powers the specifications table and its copy action. The React bundle loads only when the table approaches the viewport; the original HTML table remains available without JavaScript or if the enhancement cannot load. Copying requires clipboard permission and a secure context such as HTTPS or localhost.
- **CSS animation:** [Animate.css](https://animate.style/) provides the hero entrance animation. Only the used animation is included in the local stylesheet; scroll reveals and other effects also respect the visitor's reduced-motion preference.
- **Favicon:** The SVG, multi-size ICO, PNG, and Apple Touch icons are generated from `favicon.svg`, following the output guidance from [Favicon InBrowser](https://favicon.inbrowser.app/).

Images use locally generated, responsive WebP sizes, and the hero image and font are preloaded. Run `npm run build:assets` after editing `src/react-ui.jsx`, `favicon.svg`, or the original appliance images to regenerate the browser-ready files in `vendor/`, `icons/`, `favicon.ico`, and `images/responsive/`. This also runs automatically before development, production builds, and tests. If another Animate.css effect is added, include its rules in `scripts/build-react-ui.js`. Third-party license notices are included in `vendor/` and in the production build's `licenses/` directory.

## GitHub Pages

The site can be published directly from the repository root. Its scripts, styles, fonts, and images use relative paths so they work under the `/Com1pbx/` project URL without a build step. Keep the generated assets in the repository when publishing the raw site.
