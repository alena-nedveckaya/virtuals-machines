import { Modal } from '@/components';
import WizardSidebar from './WizardSidebar';
import ConfirmCancelModal from './ConfirmCancelModal';
import { WizardHeader, WizardActions } from './components';
import { useWizardForm, useWizardNavigation } from './hooks';
import { Step1Name, Step2GeneralSettings, Step3Summary } from './steps';
import classes from './VMWizard.module.scss';

export interface WizardForm {
  name: string;
  cpu: number | undefined;
  memory: number | undefined;
  enableVirtualizedCPU: boolean;
}

interface VMWizardProps {
  onClose: () => void;
}

const VMWizard = ({ onClose }: VMWizardProps) => {
  const {
    formData,
    handleChange,
    setFieldError,
    handleSubmit,
    formState: { errors },
  } = useWizardForm();

  const {
    currentStep,
    setCurrentStep,
    showCancelModal,
    steps,
    handleNext,
    handleBack,
    handleCloseClick,
    handleConfirmCancel,
    handleCancelModal,
  } = useWizardNavigation(onClose);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Name formData={formData} errors={errors} onChange={handleChange} />;
      case 2:
        return <Step2GeneralSettings formData={formData} errors={errors} onChange={handleChange} />;
      case 3:
        return <Step3Summary formData={formData} onEditGeneral={() => setCurrentStep(2)} />;
      default:
        return null;
    }
  };

  const handleNextClick = () => {
    handleNext(formData, setFieldError, handleSubmit);
  };

  return (
    <>
      <Modal isOpen={true} onClose={handleCloseClick} className={classes.wizard}>
        <WizardHeader onClose={handleCloseClick} />

        <div className={classes.main}>
          <WizardSidebar steps={steps} currentStep={currentStep} />

          <div className={classes.content}>
            {renderStepContent()}

            <WizardActions
              currentStep={currentStep}
              totalSteps={steps.length}
              onBack={handleBack}
              onNext={handleNextClick}
            />
          </div>
        </div>
      </Modal>

      <ConfirmCancelModal
        isOpen={showCancelModal}
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModal}
      />
    </>
  );
};

export default VMWizard;
