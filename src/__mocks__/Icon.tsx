import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

const Icon = ({ name, size = 24, className, style, color, ...props }: IconProps) => {
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

export default Icon;
