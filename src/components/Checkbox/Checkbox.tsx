import classes from './Checkbox.module.scss';

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
  const handleFocus = () => {};

  const handleBlur = () => {};

  return (
    <div className={`${classes.container} ${disabled ? classes.disabled : ''}`}>
      <div className={classes.wrapper}>
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
          className={classes.input}
        />
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
