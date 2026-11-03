import {ReactElement} from 'react';
import cx from 'classnames';

interface Props {
  buttons: {
    content: ReactElement;
    srContent: string;
    onClick: () => void;
    isActive: boolean;
  }[];
}

export const ButtonGroup = ({buttons}: Props) => {
  return (
    <span className="isolate inline-flex overflow-hidden rounded-lg border border-line bg-card shadow-xs">
      {buttons.map(({content, srContent, onClick, isActive}) => (
        <button
          key={srContent}
          type="button"
          aria-label={srContent}
          aria-pressed={isActive}
          title={srContent}
          className={cx(
            'relative inline-flex h-[30px] items-center justify-center px-2.5 text-muted transition-colors focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent',
            isActive ? 'bg-active text-fg' : 'hover:bg-hover hover:text-fg'
          )}
          onClick={onClick}
        >
          <span className="sr-only">{srContent}</span>
          {content}
        </button>
      ))}
    </span>
  );
};
