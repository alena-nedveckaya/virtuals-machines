import { useState, useRef, useEffect } from 'react';
import classes from './Select.module.scss';
import { Icon } from '@/components';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Select = ({ options, value, onChange, className = '' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${classes.select} ${className}`} ref={selectRef}>
      <button type="button" className={classes.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={classes.value}>{selectedOption?.label}</span>
        <Icon
          name="chevron-down"
          size={20}
          className={`${classes.arrow} ${isOpen ? classes.open : ''}`}
        />
      </button>

      {isOpen && (
        <div className={classes.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${classes.option} ${option.value === value ? classes.selected : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
