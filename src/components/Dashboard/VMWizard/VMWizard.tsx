import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/redux';
import { createVM } from '@/store/slices/vmSlice';
import { Button, Modal } from '@/components';

import WizardSidebar from './WizardSidebar';
import ConfirmCancelModal from './ConfirmCancelModal';
import classes from './VMWizard.module.scss';
import { Step1Name, Step2GeneralSettings, Step3Summary } from './steps';

interface VMWizardProps {
  onClose: () => void;
}

type WizardForm = {
  name: string;
  hostServer: string;
  cpu: number;
  memory: number;
  storage: number;
  os: string;
  enableVirtualizedCPU: boolean;
};

const VMWizard = ({ onClose }: VMWizardProps) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<WizardForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      cpu: undefined,
      memory: undefined,
      enableVirtualizedCPU: false,
    },
  });

  const formData = watch();

  const steps = [
    { id: 1, title: 'Virtual Machine Name' },
    { id: 2, title: 'General Settings' },
    { id: 3, title: '' },
  ];

  const onSubmit = async (data: WizardForm) => {
    console.log(data);
    try {
      await dispatch(createVM(data)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create VM:', error);
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const hasValue = !!formData.name?.trim();
      const withinLimit = (formData.name?.length || 0) <= 80;

      if (!hasValue) {
        setError('name', { type: 'manual', message: 'Name is required' });
        return false;
      }
      if (!withinLimit) {
        setError('name', { type: 'manual', message: 'Name is too long' });
        return false;
      }
      clearErrors('name');
      return true;
    }

    if (step === 2) {
      let ok = true;

      if (formData.cpu == null) {
        setError('cpu' as any, { type: 'manual', message: 'CPU is required' });
        ok = false;
      } else if (formData.cpu < 1 || formData.cpu > 12) {
        setError('cpu' as any, { type: 'manual', message: 'CPU must be between 1 and 12' });
        ok = false;
      } else {
        clearErrors('cpu' as any);
      }

      if (formData.memory == null) {
        setError('memory' as any, { type: 'manual', message: 'Memory is required' });
        ok = false;
      } else if (formData.memory < 1 || formData.memory > 50) {
        setError('memory' as any, { type: 'manual', message: 'Memory must be between 1 and 50' });
        ok = false;
      } else {
        clearErrors('memory' as any);
      }

      return ok;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const numeric = name === 'cpu' || name === 'memory' || name === 'storage';

    const nextVal =
      type === 'checkbox'
        ? checked
        : numeric
          ? value === ''
            ? undefined
            : parseInt(value, 10)
          : value;

    setValue(name as keyof WizardForm, nextVal as any, { shouldDirty: true });

    clearErrors(name as any); // убираем ошибку при вводе
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;

    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleCloseClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    onClose();
  };

  const handleCancelModal = () => {
    setShowCancelModal(false);
  };

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

  return (
    <>
      <Modal isOpen={true} onClose={handleCloseClick} className={classes.wizard}>
        <div className={classes.header}>
          <div>New virtual machine</div>
          <button className={classes.closeBtn} onClick={handleCloseClick}>
            ×
          </button>
        </div>

        <div className={classes.main}>
          <WizardSidebar steps={steps} currentStep={currentStep} />

          <div className={classes.content}>
            {renderStepContent()}

            <div className={classes.actions}>
              {currentStep > 1 && (
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button type="button" variant="primary" onClick={handleNext}>
                {currentStep === steps.length ? 'Create VM' : 'Next'}
              </Button>
            </div>
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
