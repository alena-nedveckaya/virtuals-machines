import { Checkbox, Input, RamScale } from '@/components';

interface Step2GeneralSettingsProps {
  formData: {
    cpu: number | undefined;
    memory: number | undefined;
    enableVirtualizedCPU: boolean;
  };
  errors: { [key: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onUpdateFormData: (updater: (prev: any) => any) => void;
}

const Step2GeneralSettings = ({
  formData,
  errors,
  onChange,
  onUpdateFormData,
}: Step2GeneralSettingsProps) => {
  return (
    <div className="step-content">
      <h1>General Settings</h1>
      <p>Configure the virtual machine hardware.</p>

      <div className="form-group">
        <Input
          type="number"
          label="CPU"
          id="cpu"
          name="cpu"
          value={formData.cpu || ''}
          onChange={onChange}
          error={errors.cpu}
          min={1}
          max={12}
          suffixWhileTyping="/12"
          required
          showStepper={true}
          hint="Enter number of processors up to 12."
          onIncrement={() =>
            onUpdateFormData((prev: any) => ({ ...prev, cpu: Math.min(prev.cpu + 1, 12) }))
          }
          onDecrement={() =>
            onUpdateFormData((prev: any) => ({ ...prev, cpu: Math.max(prev.cpu - 1, 1) }))
          }
        />
        <Checkbox
          id="enableVirtualizedCPU"
          name="enableVirtualizedCPU"
          label="Enable virtualized CPU performance counters"
          checked={formData.enableVirtualizedCPU}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <Input
          type="number"
          label="RAM"
          id="memory"
          name="memory"
          value={formData.memory || ''}
          onChange={onChange}
          min={0}
          max={50}
          error={errors.memory}
          required
          showStepper={true}
          suffixWhileTyping="/50 GB"
          hint="Enter memory amount up to 50GB."
          onIncrement={() =>
            onUpdateFormData((prev: any) => ({ ...prev, memory: Math.min(prev.memory + 1, 50) }))
          }
          onDecrement={() =>
            onUpdateFormData((prev: any) => ({ ...prev, memory: Math.max(prev.memory - 1, 1) }))
          }
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
