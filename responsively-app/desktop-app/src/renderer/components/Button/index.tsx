import {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import {Icon} from '@iconify/react';

/**
 * Shared button styling. These classes are part of the component contract, so
 * tests assert the semantic variants rather than the rendered colors.
 */
interface CustomProps {
  className?: string;
  isActive?: boolean;
  isLoading?: boolean;
  isPrimary?: boolean;
  isTextButton?: boolean;
  disableHoverEffects?: boolean;
  isActionButton?: boolean;
  subtle?: boolean;
  disabled?: boolean;
}

const Button = ({
  className = '',
  isActive,
  isLoading = false,
  isPrimary = false,
  isTextButton = false,
  isActionButton = false,
  subtle = false,
  disableHoverEffects = false,
  disabled = false,
  children,
  ...props
}: CustomProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const [isLoadingDone, setIsLoadingDone] = useState<boolean>(false);
  const prevLoadingState = useRef(false);

  useEffect(() => {
    if (!isLoading && prevLoadingState.current === true) {
      setIsLoadingDone(true);
      const timeout = setTimeout(() => {
        setIsLoadingDone(false);
      }, 800);
      prevLoadingState.current = isLoading;
      return () => clearTimeout(timeout);
    }
    prevLoadingState.current = isLoading;
    return undefined;
  }, [isLoading]);

  const hoverStyles = disableHoverEffects
    ? ''
    : isPrimary
      ? 'hover:brightness-110'
      : 'hover:bg-hover hover:text-fg';

  return (
    <button
      className={cx(
        'inline-flex min-h-[30px] items-center justify-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-medium text-fg transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel',
        hoverStyles,
        {
          [className]: className?.length > 0,
          'bg-accent text-on-accent': isPrimary,
          'border border-line bg-card': isActionButton,
          'px-2': isActionButton || isTextButton,
          'text-muted': subtle && !isPrimary,
          'bg-accent-soft text-accent': isActive === true && !isPrimary,
          'cursor-not-allowed opacity-40': disabled,
          'pointer-events-none': disabled,
          'hover:brightness-100': disabled && isPrimary,
        }
      )}
      type="button"
      disabled={disabled}
      aria-pressed={typeof isActive === 'boolean' ? isActive : undefined}
      {...props}
    >
      {/* pointer-events-none keeps mouse events targeting the stable button
          node — icon SVGs can be re-rendered mid-click (e.g. by an input
          blur), which makes the browser drop the click entirely. */}
      <span className="pointer-events-none contents">
        {isLoading ? <Icon icon="line-md:loading-twotone-loop" /> : null}
        {isLoadingDone ? <Icon icon="line-md:circle-to-confirm-circle-transition" /> : null}
        {!isLoading && !isLoadingDone ? children : null}
      </span>
    </button>
  );
};

export default Button;
