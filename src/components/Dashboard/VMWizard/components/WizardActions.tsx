import { Button } from '@/components';
import classes from '../VMWizard.module.scss';

interface WizardActionsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

const WizardActions = ({ currentStep, totalSteps, onBack, onNext }: WizardActionsProps) => {
  return (
    <div className={classes.actions}>
      {currentStep > 1 && (
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
      )}
      <Button type="button" variant="primary" onClick={onNext}>
        {currentStep === totalSteps ? 'Create VM' : 'Next'}
      </Button>
    </div>
  );
};

export default WizardActions;
