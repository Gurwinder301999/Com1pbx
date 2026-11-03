# Responsively App renderer design fixes

This directory is a shallow, sparse snapshot of
[`responsively-org/responsively-app`](https://github.com/responsively-org/responsively-app)
at `b23488fc` on `main` (2026-10-03). It was added to the Com1pbx workspace so the
Electron desktop renderer could be audited and improved here. Changes are committed
to the Arena branch `arena/36100136-com1pbx`; no upstream push was attempted. The
upstream project is licensed under AGPL-3.0 (see `LICENSE`).

## Problems found

- `desktop-app/src/renderer/App.css` already defined a coherent **Hybrid Studio**
  semantic palette (`--bg`, `--panel`, `--fg`, `--muted`, `--accent`, `--line`, and
  related tokens), but many components still used hard-coded `slate`, `gray`,
  `emerald`, `white`, `red`, and `blue` Tailwind utilities. Light/dark surfaces
  therefore drifted and some controls had poor contrast.
- Interactive controls often removed the default outline with
  `focus:outline-none` and supplied no visible focus replacement.
- Modals, settings panels, shortcuts, bookmarks, and the device manager used fixed
  widths/heights or hard-coded offsets that could overflow smaller windows.
- Toolbar labels crowded the address bar at narrow widths; several icon-only
  actions lacked tooltips or accessible names.
- Popovers, suggestion lists, and inputs had inconsistent focus, semantic labels,
  and motion behavior.

## Changes made

- Added semantic `--color-danger*` and `--color-toggle-knob` tokens, theme-aware
  text selection, thin root scrollbars, and a global
  `prefers-reduced-motion: reduce` override to `App.css`.
- Rewrote the shared controls — `Button`, `ButtonGroup`, `Modal`, `DropDown`,
  `ConfirmDialog`, `Input`, `Select`, and `Toggle` — around semantic tokens,
  visible `focus-visible` rings, appropriate ARIA names/states, and
  dialog-safe responsive sizing.
- Migrated 23 renderer component files from legacy palette utilities to semantic
  tokens. Consolidated dividers, tabs, the focus-layout close affordance, and thin
  custom scrollbars.
- Rebuilt `ToolBar/primitives.tsx` so `Rotate`, `Inspect`, `Capture`, and `Scheme`
  collapse to icon-only actions below `2xl` while retaining `aria-label` and
  `title`. Reduced the address bar minimum width from `220px` to `180px`.
- Improved `TitleBar` title centering/truncation, `AddressBar` focus ring and
  `aria-label`, suggestion-list keyboard focus and semantic separator, bookmark
  edit buttons with `focus-within` visibility, settings inputs with `bg-input`,
  and the view-all-bookmarks panel with a viewport-safe width.
- Added `src/renderer/design-system.test.tsx` to guard the semantic token
  migration, reduced-motion support, accessible compact toolbar actions, and
  primary-button focus styles. Updated `Button.test.tsx` for the new button
  classes and `aria-pressed` behavior.

## Validation

| Check | Result |
| --- | --- |
| `./node_modules/.bin/prettier --write` | Applied to all touched files |
| `npx tsc --noEmit` | Pass |
| `npx eslint src/renderer --max-warnings 0` | Pass |
| `npx vitest run --reporter=dot` | **39 files / 281 tests pass** (baseline: 38 / 275) |
| Production renderer webpack build | Pass |

The Electron app itself was not launched for a visual screenshot: no Electron
browser binary is available in this sandbox, and the package declares Node `>=24`
while the sandbox provides Node 22. The renderer production bundle compiles and
all static checks above pass.

Specialized color overlays in `Previewer/Device/DeviceFrame.tsx`,
`Previewer/Device/DesignOverlay/index.tsx`, and `Previewer/Guides/index.tsx` were
intentionally left on their measurement-oriented palette.
