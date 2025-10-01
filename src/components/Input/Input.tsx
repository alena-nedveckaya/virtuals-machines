import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components';
import classes from './Input.module.scss';

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  suffixWhileTyping?: string; // e.g. "/50 GB"
}

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  maxLength,
  min,
  max,
  error,
  hint,
  disabled = false,
  className,
  showStepper = false,
  onIncrement,
  onDecrement,
  suffixWhileTyping,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  const isFloating =
    isFocused ||
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && value > 0);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Measure typed text width to place suffix immediately after text
  useEffect(() => {
    if (!measureRef.current) return;
    const text = String(value ?? '');
    measureRef.current.textContent = text;
    setTextWidth(measureRef.current.offsetWidth || 0);
  }, [value, type, isFocused]);

  return (
    <div
      className={`${classes.container} ${error ? classes.error : ''} ${disabled ? classes.disabled : ''}`}
    >
      <div className={classes.wrapper}>
        {/* Invisible measurer for typed text width */}
        <span className={classes.measure} ref={measureRef} aria-hidden="true"></span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          min={min}
          max={max}
          disabled={disabled}
          className={`${classes.field} ${className} ${showStepper ? classes.withStepper : ''}`}
        />
        <label htmlFor={id} className={`${classes.label} ${isFloating ? classes.floating : ''}`}>
          {label}
        </label>
        {suffixWhileTyping && (isFocused || String(value || '').length > 0) && (
          <span
            className={classes.suffix}
            style={{ left: `${19 + textWidth}px` }}
            aria-hidden="true"
          >
            {suffixWhileTyping}
          </span>
        )}
        {showStepper && (
          <div className={classes.stepper}>
            <button
              type="button"
              className={classes.stepperBtn}
              onClick={onIncrement}
              disabled={disabled}
            >
              <Icon
                name="state-layer"
                size={20}
                className={`${classes.stepperIcon} ${classes.upIcon}`}
              />
            </button>
            <button
              type="button"
              className={classes.stepperBtn}
              onClick={onDecrement}
              disabled={disabled}
            >
              <Icon
                name="state-layer"
                size={20}
                className={`${classes.stepperIcon} ${classes.downIcon}`}
              />
            </button>
          </div>
        )}
      </div>
      {(hint || error) && <span className={classes.hint}>{error || hint}</span>}
    </div>
  );
};

export default Input;
