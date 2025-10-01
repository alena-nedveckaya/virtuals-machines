import { Checkbox, Input, RamScale } from '@/components';
import classes from './Step2GeneralSettings.module.scss';

interface Step2GeneralSettingsProps {
  formData: {
    cpu: number | undefined;
    memory: number | undefined;
    enableVirtualizedCPU: boolean;
  };
  errors: { [key: string]: { message?: string } };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step2GeneralSettings = ({ formData, errors, onChange }: Step2GeneralSettingsProps) => {
  const adjustNumber = (name: 'cpu' | 'memory', delta: number, min: number, max: number) => {
    const current = Number(formData[name] ?? 0);
    const next = Math.min(max, Math.max(min, current + delta));
    const fakeEvent = {
      target: { name, value: String(next), type: 'number', checked: false },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  return (
    <div className={classes.stepContent}>
      <h1>General Settings</h1>
      <p>Configure the virtual machine hardware.</p>

      <div className={classes.formGroup}>
        <Input
          type="number"
          label="CPU"
          id="cpu"
          name="cpu"
          value={formData.cpu || ''}
          onChange={onChange}
          error={errors.cpu?.message}
          min={1}
          max={12}
          suffixWhileTyping=" /12"
          required
          showStepper={true}
          hint="Enter number of processors up to 12."
          onIncrement={() => adjustNumber('cpu', +1, 1, 12)}
          onDecrement={() => adjustNumber('cpu', -1, 1, 12)}
        />
        <Checkbox
          id="enableVirtualizedCPU"
          name="enableVirtualizedCPU"
          label="Enable virtualized CPU performance counters"
          checked={formData.enableVirtualizedCPU}
          onChange={onChange}
        />
      </div>

      <div className={classes.formGroup}>
        <Input
          type="number"
          label="RAM"
          id="memory"
          name="memory"
          value={formData.memory || ''}
          onChange={onChange}
          min={0}
          max={50}
          error={errors.memory?.message}
          required
          showStepper={true}
          suffixWhileTyping=" /50 GB"
          hint="Enter memory amount up to 50GB."
          onIncrement={() => adjustNumber('memory', +1, 0, 50)}
          onDecrement={() => adjustNumber('memory', -1, 0, 50)}
        />

        <RamScale
          maxGb={50}
          recommendedStartGb={16}
          recommendedEndGb={32}
          currentGb={formData.memory}
        />
      </div>
    </div>
  );
};

export default Step2GeneralSettings;
