import { type WizardForm } from '../VMWizard';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateStep1 = (formData: WizardForm): ValidationResult => {
  const errors: Record<string, string> = {};

  const hasValue = formData.name?.trim().length > 0;
  const withinLimit = (formData.name?.length || 0) <= 80;

  if (!hasValue) {
    errors.name = 'Name is required';
  } else if (!withinLimit) {
    errors.name = 'Name is too long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep2 = (formData: WizardForm): ValidationResult => {
  const errors: Record<string, string> = {};

  if (formData.cpu == null) {
    errors.cpu = 'CPU is required';
  } else if (formData.cpu < 1 || formData.cpu > 12) {
    errors.cpu = 'CPU must be between 1 and 12';
  }

  if (formData.memory == null) {
    errors.memory = 'Memory is required';
  } else if (formData.memory < 1 || formData.memory > 50) {
    errors.memory = 'Memory must be between 1 and 50';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep = (step: number, formData: WizardForm): ValidationResult => {
  switch (step) {
    case 1:
      return validateStep1(formData);
    case 2:
      return validateStep2(formData);
    default:
      return { isValid: true, errors: {} };
  }
};
