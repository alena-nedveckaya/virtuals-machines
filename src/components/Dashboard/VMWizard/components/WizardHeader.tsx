import classes from '../VMWizard.module.scss';

interface WizardHeaderProps {
  onClose: () => void;
}

const WizardHeader = ({ onClose }: WizardHeaderProps) => {
  return (
    <div className={classes.header}>
      <div>New virtual machine</div>
      <button className={classes.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default WizardHeader;
