import {useId} from 'react';

interface Props {
  label: string;
}

const Select = ({
  label,
  children,
  ...props
}: Props &
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      <select
        id={id}
        className="rounded-lg border border-line bg-input px-3 py-2 text-sm text-fg focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
