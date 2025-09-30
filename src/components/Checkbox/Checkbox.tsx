import { useState } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
}: CheckboxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`checkbox-container ${disabled ? 'disabled' : ''}`}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className="checkbox-input"
        />
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
