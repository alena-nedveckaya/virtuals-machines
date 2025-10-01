import { render, screen, fireEvent } from '@testing-library/react';
import Select, { type SelectOption } from '../Select';

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

describe('Select', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    options: mockOptions,
    value: 'option1',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders select with selected value', () => {
    render(<Select {...defaultProps} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-chevron-down')).toBeInTheDocument();
  });

  it('shows dropdown when trigger is clicked', () => {
    render(<Select {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    // Check that all options are in the dropdown
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    const option1InDropdown = screen.getAllByText('Option 1')[1];
    expect(option1InDropdown).toBeInTheDocument();
  });

  it('hides dropdown when trigger is clicked again', () => {
    render(<Select {...defaultProps} />);

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  it('closes dropdown after option selection', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('shows selected option with selected class', () => {
    render(<Select {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const selectedOption = screen.getAllByText('Option 1')[1];
    expect(selectedOption).toHaveClass('selected');
  });

  it('rotates arrow when dropdown is open', () => {
    render(<Select {...defaultProps} />);

    const trigger = screen.getByRole('button');
    const arrow = screen.getByTestId('icon-chevron-down');

    expect(arrow).not.toHaveClass('open');

    fireEvent.click(trigger);
    expect(arrow).toHaveClass('open');
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <Select {...defaultProps} />
        <div data-testid="outside">Outside element</div>
      </div>,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByText('Option 2')).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('handles empty options array', () => {
    render(<Select {...defaultProps} options={[]} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles value not in options', () => {
    render(<Select {...defaultProps} value="nonexistent" />);

    const trigger = screen.getByRole('button');
    const valueSpan = trigger.querySelector('.value');
    expect(valueSpan).toHaveTextContent('');
  });

  it('applies custom className', () => {
    const { container } = render(<Select {...defaultProps} className="custom-class" />);

    const selectElement = container.firstChild;
    expect(selectElement).toHaveClass('custom-class');
  });

  it('renders all options in dropdown', () => {
    render(<Select {...defaultProps} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    const option1InDropdown = screen.getAllByText('Option 1')[1];
    expect(option1InDropdown).toBeInTheDocument();
  });
});
