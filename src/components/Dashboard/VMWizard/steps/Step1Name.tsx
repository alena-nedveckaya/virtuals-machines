import { Input } from '@/components';
import classes from './Step1Name.module.scss';

interface Step1NameProps {
  formData: {
    name: string;
  };
  errors: { [key: string]: { message?: string } };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step1Name = ({ formData, errors, onChange }: Step1NameProps) => {
  return (
    <div className={classes.stepContent}>
      <h1>Select a name</h1>
      <p>A virtual machine requires storage so that you can install an operating system.</p>
      <Input
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={onChange}
        error={errors.name?.message}
        hint="Enter unique name up to 80 characters"
      />
    </div>
  );
};

export default Step1Name;
