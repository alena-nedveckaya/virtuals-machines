import { useState } from 'react';
import illustration from '@/assets/illustration.svg';
import { Icon } from '@/components';
import { Step1Name, Step2GeneralSettings } from './steps';
import './VMWizard.css';

interface VMWizardProps {
  onClose: () => void;
  onCreate: (vmData: any) => void;
}

const VMWizard = ({ onClose, onCreate }: VMWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    hostServer: '43C07-27',
    cpu: undefined,
    memory: undefined,
    storage: 10,
    os: 'Ubuntu 20.04',
    enableVirtualizedCPU: false,
    status: 'pending' as 'running' | 'stopped' | 'pending',
    uptime: '0:00:00:00',
    alerts: {
      type: 'good' as 'critical' | 'important' | 'moderate' | 'good',
      count: 0,
    },
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const steps = [
    { id: 1, title: 'Virtual Machine Name' },
    { id: 2, title: 'General Settings' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length > 80) {
        newErrors.name = 'Name is too long';
      }
    }

    if (step === 2) {
      if (formData?.cpu && (formData?.cpu < 1 || formData?.cpu > 12)) {
        newErrors.cpu = 'CPU must be between 1 and 12';
      }
      if (formData?.memory && (formData?.memory < 1 || formData?.memory > 50)) {
        newErrors.memory = 'Memory must be between 1 and 50';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'cpu' || name === 'memory' || name === 'storage'
            ? parseInt(value)
            : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      if (validateStep(currentStep)) {
        onCreate(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Name formData={formData} errors={errors} onChange={handleChange} />;
      case 2:
        return (
          <Step2GeneralSettings
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onUpdateFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="vm-wizard-overlay">
      <div className="vm-wizard">
        <div className="wizard-header">
          <div>New virtual machine</div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wizard-main">
          <div className="wizard-sidebar">
            <div className="wizard-title-primary">Welcome to the</div>
            <div className="wizard-title-secondary"> New Virtual Machine Wizard</div>
            <hr className="wizard-divider" />
            <div className="steps-nav">
              {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  >
                    <div className="step-icon">
                      {isCompleted && <Icon name="check" size={16} />}
                      {isActive && <Icon name="check-indeterminate" size={16} />}
                    </div>
                    <span className="step-title">{step.title}</span>
                  </div>
                );
              })}
            </div>
            <div className="sidebar-illustration">
              <img src={illustration} alt="Virtual Machine Illustration" />
            </div>
          </div>

          <div className="wizard-content">
            {renderStepContent()}

            <div className="wizard-actions">
              {currentStep > 1 && (
                <button type="button" className="back-btn" onClick={handleBack}>
                  Back
                </button>
              )}
              <button
                type="button"
                className={`next-btn ${!formData.name.trim() || errors.name ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={!formData.name.trim() || !!errors.name}
              >
                {currentStep === steps.length ? 'Create VM' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VMWizard;
