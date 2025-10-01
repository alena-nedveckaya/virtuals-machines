import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { createVM } from '@/store/slices/vmSlice';
import { type WizardForm } from '../VMWizard';
import { validateStep } from '../utils/validation';

export const useWizardNavigation = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const steps = [
    { id: 1, title: 'Virtual Machine Name' },
    { id: 2, title: 'General Settings' },
    { id: 3, title: '' },
  ];

  const onSubmit = async (data: WizardForm) => {
    try {
      // Ensure required fields are present before submitting
      if (!data.name || data.cpu == null || data.memory == null) {
        console.error('Name, CPU and memory are required');
        return;
      }

      await dispatch(
        createVM({
          name: data.name,
          cpu: data.cpu,
          memory: data.memory,
        }),
      ).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create VM:', error);
    }
  };

  const validateCurrentStep = (
    formData: WizardForm,
    setFieldError: (field: keyof WizardForm, message: string) => void,
  ) => {
    const validation = validateStep(currentStep, formData);

    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        setFieldError(field as keyof WizardForm, message);
      });
      return false;
    }

    return true;
  };

  const handleNext = (
    formData: WizardForm,
    setFieldError: (field: keyof WizardForm, message: string) => void,
    handleSubmit: (onSubmit: (data: WizardForm) => void) => () => void,
  ) => {
    const isValid = validateCurrentStep(formData, setFieldError);
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

  return {
    currentStep,
    setCurrentStep,
    showCancelModal,
    steps,
    handleNext,
    handleBack,
    handleCloseClick,
    handleConfirmCancel,
    handleCancelModal,
  };
};
