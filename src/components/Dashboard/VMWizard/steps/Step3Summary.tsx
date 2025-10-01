import Icon from '@/components/Icon';
import classes from './Step3Summary.module.scss';

interface Step3SummaryProps {
  formData: {
    name: string;
    cpu?: number;
    memory?: number;
  };
  onEditGeneral: () => void;
}

const Step3Summary = ({ formData, onEditGeneral }: Step3SummaryProps) => {
  return (
    <div className={classes.stepContent}>
      <h1>Ready to complete</h1>
      <p>Review your settings selection before finishing the wizard.</p>

      <div className={classes.card}>
        <div className={classes.row}>
          <div className={classes.label}>Name</div>
          <div className={classes.value}>{formData.name || '-'}</div>
        </div>
        <div className={classes.divider} />
        <div className={classes.row}>
          <div className={classes.label}>CPU</div>
          <div className={classes.value}>{formData.cpu ?? '-'}</div>
        </div>
        <div className={classes.divider} />
        <div className={classes.row}>
          <div className={classes.label}>RAM</div>
          <div className={classes.value}>{formData.memory ? `${formData.memory} GB` : '-'}</div>
        </div>
        <div className={classes.divider} />
        <div className={classes.row}>
          <button type="button" className={classes.edit} onClick={onEditGeneral} aria-label="Edit">
            <Icon name="edit" size={40} className="summary-edit-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Summary;
