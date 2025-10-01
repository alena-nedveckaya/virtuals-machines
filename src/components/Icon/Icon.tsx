import CheckIcon from '@/assets/check.svg?react';
import CheckIndeterminateIcon from '@/assets/check_indeterminate_small.svg?react';
import StateLayerIcon from '@/assets/state-layer.svg?react';
import EditIcon from '@/assets/edit.svg?react';
import ExclamationIcon from '@/assets/exclamation.svg?react';
import ArrowsIcon from '@/assets/arrows.svg?react';
import CopyIcon from '@/assets/copy.svg?react';
import OkIcon from '@/assets/ok.svg?react';
import WarningIcon from '@/assets/warning.svg?react';
import PlusIcon from '@/assets/plus.svg?react';
import ChevronDownIcon from '@/assets/chevron_down.svg?react';
import LogoIcon from '@/assets/logo.svg?react';
import BellIcon from '@/assets/bell.svg?react';
import DotIcon from '@/assets/dot.svg?react';

import classes from './Icon.module.scss';

export type IconName =
  | 'check'
  | 'check-indeterminate'
  | 'state-layer'
  | 'edit'
  | 'exclamation'
  | 'warning'
  | 'ok'
  | 'copy'
  | 'arrows'
  | 'plus'
  | 'chevron-down'
  | 'logo'
  | 'bell'
  | 'dot';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const iconMap = {
  check: CheckIcon,
  'check-indeterminate': CheckIndeterminateIcon,
  'state-layer': StateLayerIcon,
  edit: EditIcon,
  exclamation: ExclamationIcon,
  warning: WarningIcon,
  arrows: ArrowsIcon,
  ok: OkIcon,
  copy: CopyIcon,
  plus: PlusIcon,
  'chevron-down': ChevronDownIcon,
  logo: LogoIcon,
  bell: BellIcon,
  dot: DotIcon,
};

const Icon = ({ name, size = 16, className = '', color, style, onClick }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`${classes.icon} ${className}`}
      fill={color}
      style={{
        fill: color || 'currentColor',
        color: color || 'currentColor',
        ...style,
      }}
      onClick={onClick}
    />
  );
};

export default Icon;
