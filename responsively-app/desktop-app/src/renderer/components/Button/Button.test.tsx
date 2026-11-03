import {act, render, screen} from '@testing-library/react';
import Button from './index';

vi.mock('@iconify/react', () => ({
  Icon: () => <div data-testid="icon" />,
}));

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toHaveAttribute('aria-pressed');
  });

  it('applies custom class name', () => {
    render(<Button className="custom-class">Click me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('renders loading icon when isLoading is true', () => {
    render(<Button isLoading>Click me</Button>);
    const loadingIcon = screen.getByTestId('icon');
    expect(loadingIcon).toBeInTheDocument();
  });

  it('renders confirmation icon when loading is done', () => {
    vi.useFakeTimers();
    const {rerender} = render(<Button isLoading>Click me</Button>);

    act(() => {
      rerender(<Button isLoading={false}>Click me</Button>);
      vi.runAllTimers(); // Use act to advance timers
    });

    const confirmationIcon = screen.getByTestId('icon');
    expect(confirmationIcon).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('applies semantic primary button styles', () => {
    render(<Button isPrimary>Click me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass('bg-accent');
    expect(buttonElement).toHaveClass('text-on-accent');
    expect(buttonElement).toHaveClass('focus-visible:ring-accent');
  });

  it('applies semantic action button styles', () => {
    render(<Button isActionButton>Click me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass('bg-card');
    expect(buttonElement).toHaveClass('border-line');
  });

  it('applies subtle semantic styles', () => {
    render(<Button subtle>Click me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass('text-muted');
    expect(buttonElement).toHaveClass('hover:bg-hover');
  });

  it('disables hover effects when disableHoverEffects is true', () => {
    render(
      <Button disableHoverEffects subtle>
        Click me
      </Button>
    );
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).not.toHaveClass('hover:bg-hover');
    expect(buttonElement).not.toHaveClass('hover:brightness-110');
  });

  it('exposes toggle state only when the button is toggleable', () => {
    render(<Button isActive={false}>Click me</Button>);
    expect(screen.getByRole('button', {name: /click me/i})).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('renders children correctly when not loading or loading done', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('does not render children when loading or loading done', () => {
    const {rerender} = render(<Button isLoading>Click me</Button>);
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();

    act(() => {
      rerender(<Button isLoading={false}>Click me</Button>);
    });

    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });
});
