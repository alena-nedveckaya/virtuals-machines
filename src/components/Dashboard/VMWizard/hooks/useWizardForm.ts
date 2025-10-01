import { useForm } from 'react-hook-form';
import { type WizardForm } from '../VMWizard';

export const useWizardForm = () => {
  const form = useForm<WizardForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      cpu: undefined,
      memory: undefined,
      enableVirtualizedCPU: false,
    },
  });

  const { watch, setValue, setError, clearErrors } = form;
  const formData = watch();

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

    setValue(name as keyof WizardForm, nextVal, { shouldDirty: true });
    clearErrors(name as keyof WizardForm);
  };

  const setFieldError = (field: keyof WizardForm, message: string) => {
    setError(field, { type: 'manual', message });
  };

  const clearFieldError = (field: keyof WizardForm) => {
    clearErrors(field);
  };

  return {
    ...form,
    formData,
    handleChange,
    setFieldError,
    clearFieldError,
  };
};
