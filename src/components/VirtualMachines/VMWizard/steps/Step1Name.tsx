import { Input } from '@/components';

interface Step1NameProps {
  formData: {
    name: string;
  };
  errors: { [key: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step1Name = ({ formData, errors, onChange }: Step1NameProps) => {
  return (
    <div className="step-content">
      <h1>Select a name</h1>
      <p>A virtual machine requires storage so that you can install an operating system.</p>
      <Input
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={onChange}
        required
        maxLength={80}
        error={errors.name}
        hint="Enter unique name up to 80 characters"
      />
    </div>
  );
};

export default Step1Name;
