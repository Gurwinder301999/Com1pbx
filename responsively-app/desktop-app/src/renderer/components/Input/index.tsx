import {useId} from 'react';
import cx from 'classnames';

interface Props {
  label: string;
  error?: string | null;
}

const Input = ({
  label,
  error,
  ...props
}: Props &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  const id = useId();
  const errorId = `${id}-error`;
  const isCheckbox = props.type === 'checkbox';
  return (
    <div
      className={cx('flex gap-1.5', {
        'flex-col': !isCheckbox,
        'flex-row-reverse items-center justify-end': isCheckbox,
      })}
    >
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={cx(
          'rounded-lg border bg-input px-3 py-2 text-sm text-fg placeholder:text-muted',
          'focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent',
          error != null ? 'border-danger' : 'border-line'
        )}
        aria-invalid={error != null || undefined}
        aria-describedby={error != null ? errorId : undefined}
        {...props}
      />
      {error != null && (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
