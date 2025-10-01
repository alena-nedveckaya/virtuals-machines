import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    id: 'test-checkbox',
    name: 'test-checkbox',
    label: 'Test Checkbox',
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with label', () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked checkbox when checked prop is true', () => {
    render(<Checkbox {...defaultProps} checked={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when label is clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const label = screen.getByText('Test Checkbox');
    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables checkbox when disabled prop is true', () => {
    render(<Checkbox {...defaultProps} disabled={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies disabled class when disabled prop is true', () => {
    const { container } = render(<Checkbox {...defaultProps} disabled={true} />);

    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('disabled');
  });

  it('does not apply disabled class when disabled prop is false', () => {
    const { container } = render(<Checkbox {...defaultProps} disabled={false} />);

    const containerElement = container.firstChild;
    expect(containerElement).not.toHaveClass('disabled');
  });

  it('sets required attribute when required prop is true', () => {
    render(<Checkbox {...defaultProps} required={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('does not set required attribute when required prop is false', () => {
    render(<Checkbox {...defaultProps} required={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeRequired();
  });

  it('has correct id and name attributes', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    expect(checkbox).toHaveAttribute('name', 'test-checkbox');
  });

  it('has correct label association', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Test Checkbox');

    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    expect(label).toHaveAttribute('for', 'test-checkbox');
  });

  it('handles focus and blur events', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.focus(checkbox);
    fireEvent.blur(checkbox);

    expect(checkbox).toBeInTheDocument();
  });

  it('passes correct event to onChange handler', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          type: 'checkbox',
        }),
        type: 'change',
      }),
    );
  });

  it('renders with different label text', () => {
    render(<Checkbox {...defaultProps} label="Different Label" />);

    expect(screen.getByText('Different Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Different Label')).toBeInTheDocument();
  });

  it('maintains state when clicked multiple times', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
