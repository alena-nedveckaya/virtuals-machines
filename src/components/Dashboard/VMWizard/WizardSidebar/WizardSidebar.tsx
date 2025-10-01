import { Icon } from '@/components';
import illustration from '@/assets/illustration.svg';
import classes from './WizardSidebar.module.scss';

interface WizardSidebarProps {
  steps: Array<{ id: number; title: string }>;
  currentStep: number;
}

const WizardSidebar = ({ steps, currentStep }: WizardSidebarProps) => {
  return (
    <div className={classes.sidebar}>
      <div className="wizard-title-primary">Welcome to the</div>
      <div className={classes.titleSecondary}> New Virtual Machine Wizard</div>
      <hr className={classes.divider} />
      <div className={classes.stepsNav}>
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`${classes.stepItem} ${isActive ? classes.active : ''} ${isCompleted ? classes.completed : ''}`}
            >
              <div className={classes.stepIcon}>
                {isCompleted && <Icon name="check" size={16} />}
                {isActive && step.title && <Icon name="check-indeterminate" size={16} />}
              </div>
              <span className={classes.stepTitle}>{step.title}</span>
            </div>
          );
        })}
      </div>
      <div className={classes.sidebarIllustration}>
        <img src={illustration} alt="Virtual Machine Illustration" />
      </div>
    </div>
  );
};

export default WizardSidebar;
