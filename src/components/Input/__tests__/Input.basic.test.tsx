import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

// Mock the Icon component
jest.mock('@/components/Icon', () => {
  return function MockIcon({ name, size, className, style, color, ...props }: any) {
    return (
      <span
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          backgroundColor: color || 'currentColor',
          ...style,
        }}
        data-testid={`icon-${name}`}
        {...props}
      >
        {name}
      </span>
    );
  };
});

describe('Input', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'test-input',
    label: 'Test Label',
    value: '',
    onChange: jest.fn(),
  };

  it('renders input with label', () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    render(<Input {...defaultProps} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows hint message when hint prop is provided', () => {
    render(<Input {...defaultProps} hint="Enter your name" />);

    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(<Input {...defaultProps} disabled />);

    const input = screen.getByLabelText(/test label/i);
    expect(input).toBeDisabled();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);

    const input = screen.getByLabelText(/test label/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows suffix while typing when provided', () => {
    render(<Input {...defaultProps} value="test" suffixWhileTyping="/50 GB" />);

    expect(screen.getByText('/50 GB')).toBeInTheDocument();
  });
});
