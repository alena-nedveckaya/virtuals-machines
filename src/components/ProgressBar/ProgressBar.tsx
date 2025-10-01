import classes from './ProgressBar.module.scss';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

const ProgressBar = ({ value, max = 10, className = '' }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`${classes.container} ${className}`}>
      <div className={classes.bar}>
        <div className={classes.fill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
