import React from 'react';
import classes from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) => {
  const variantClass = variant === 'primary' ? classes.primary : classes.secondary;
  const composedClassName = [classes.button, variantClass, className].filter(Boolean).join(' ');

  return (
    <button className={composedClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
