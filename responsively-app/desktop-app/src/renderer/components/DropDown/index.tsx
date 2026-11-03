import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {Icon} from '@iconify/react';
import cx from 'classnames';

interface Separator {
  type: 'separator';
}

interface Option {
  type?: 'option';
  label: React.JSX.Element | string;
  onClick: (() => void) | null;
}

type OptionOrSeparator = Option | Separator;

interface Props {
  label: React.JSX.Element | string;
  options: OptionOrSeparator[];
  className?: string | null;
}

export function DropDown({label, options, className}: Props) {
  return (
    <div className="relative text-right">
      <Menu as="div" className={`inline-block text-left ${className ?? ''}`}>
        <MenuButton className="inline-flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {label}
          <Icon icon="mdi:chevron-down" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          transition
          className="z-50 mt-2 max-h-[70vh] min-w-[180px] origin-top-right overflow-y-auto rounded-lg border border-line bg-panel p-1 text-fg shadow-elevated transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          {options.map((option, idx) => {
            if (option.type === 'separator') {
              return <div className="my-1 border-t border-line-soft" key={`divider-${idx}`} />;
            }
            return (
              <MenuItem key={idx.toString()}>
                {option.onClick !== null ? (
                  <button
                    className={cx(
                      'flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm text-fg transition-colors',
                      'focus:outline-none data-focus:bg-hover'
                    )}
                    type="button"
                    onClick={option.onClick}
                  >
                    {option.label}
                  </button>
                ) : (
                  <div className="mt-2 flex w-full items-center rounded-md px-2.5 py-1 text-xs font-semibold text-muted uppercase">
                    {option.label}
                  </div>
                )}
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}
