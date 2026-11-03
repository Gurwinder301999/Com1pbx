import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Button from './components/Button';
import {ToolbarAction} from './components/ToolBar/primitives';

// Vitest runs from the desktop-app package root.
const root = resolve(process.cwd());

const semanticFiles = [
  'src/renderer/components/Button/index.tsx',
  'src/renderer/components/ButtonGroup/index.tsx',
  'src/renderer/components/Modal/index.tsx',
  'src/renderer/components/DropDown/index.tsx',
  'src/renderer/components/ConfirmDialog/index.tsx',
  'src/renderer/components/Input/index.tsx',
  'src/renderer/components/Select/index.tsx',
  'src/renderer/components/Toggle/index.tsx',
  'src/renderer/components/ToolBar/primitives.tsx',
  'src/renderer/components/ToolBar/AddressBar/SuggestionList.tsx',
  'src/renderer/components/ToolBar/Menu/Flyout/Settings/SettingsContent.tsx',
  'src/renderer/components/ToolBar/Menu/Flyout/Settings/SettingsContentHeaders.tsx',
  'src/renderer/components/Previewer/IndividualLayoutToolBar/index.tsx',
];

const legacyPalette =
  /(?:bg|text|border|ring|divide)-(?:slate|gray|emerald|white|blue|red)(?:-[0-9]+(?:\/[0-9]+)?)?/;

describe('Hybrid Studio design system', () => {
  it('defines semantic danger tokens and respects reduced motion', async () => {
    const css = await readFile(resolve(root, 'src/renderer/App.css'), 'utf8');
    expect(css).toContain('--color-danger: var(--danger)');
    expect(css).toContain('--danger:');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('scrollbar-width: thin');
    expect(css).toContain('::selection');
  });

  it('keeps shared controls on semantic theme tokens', async () => {
    const sources = await Promise.all(
      semanticFiles.map((path) => readFile(resolve(root, path), 'utf8'))
    );
    for (const [index, source] of sources.entries()) {
      expect(source, semanticFiles[index]).not.toMatch(legacyPalette);
      expect(source, semanticFiles[index]).not.toMatch(/dark:(?:bg|text|border)-/);
    }
  });

  it('uses a responsive, accessible modal shell', async () => {
    const modal = await readFile(resolve(root, 'src/renderer/components/Modal/index.tsx'), 'utf8');
    expect(modal).toContain('max-w-[calc(100vw-32px)]');
    expect(modal).toContain('bg-panel');
    expect(modal).toContain('shadow-elevated');
    expect(modal).toContain('aria-label');
  });

  it('renders semantic primary buttons with a visible focus ring', () => {
    render(<Button isPrimary>Primary</Button>);
    const button = screen.getByRole('button', {name: 'Primary'});
    expect(button).toHaveClass('bg-accent', 'text-on-accent');
    expect(button).toHaveClass('focus-visible:ring-accent');
  });

  it('keeps compact toolbar actions accessible by name and tooltip', () => {
    render(
      <ToolbarAction
        icon={<span data-testid="toolbar-icon" />}
        label="Rotate"
        title="Rotate Devices"
      />
    );
    const button = screen.getByRole('button', {name: 'Rotate'});
    expect(button).toHaveAttribute('title', 'Rotate Devices');
    expect(screen.getByText('Rotate')).toHaveClass('hidden', '2xl:inline');
    expect(button).toHaveClass('focus-visible:ring-accent');
  });
});
