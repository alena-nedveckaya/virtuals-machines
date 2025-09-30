import checkIcon from '@/assets/check.svg';
import checkIndeterminateIcon from '@/assets/check_indeterminate_small.svg';
import stateLayerIcon from '@/assets/state-layer.svg';

export type IconName = 'check' | 'check-indeterminate' | 'state-layer';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const iconMap = {
  check: checkIcon,
  'check-indeterminate': checkIndeterminateIcon,
  'state-layer': stateLayerIcon,
};

const Icon = ({ name, size = 16, className = '' }: IconProps) => {
  const iconSrc = iconMap[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <img src={iconSrc} alt={name} width={size} height={size} className={className} />;
};

export default Icon;
