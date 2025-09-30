import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { addVM } from '@/store/slices/vmSlice';
import { VMTable, VMWizard } from '@/components';
import './VirtualMachines.css';

const VirtualMachines = () => {
  const { vms } = useAppSelector((state) => state.vms);
  const dispatch = useAppDispatch();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleCreateVM = (vmData: any) => {
    dispatch(addVM(vmData));
    setIsWizardOpen(false);
  };

  return (
    <div className="virtual-machines">
      <div className="vm-header">
        <div>
          <h1>Virtual Machines</h1>
          <p>Manage your virtual machines</p>
        </div>
        <button className="new-vm-btn" onClick={() => setIsWizardOpen(true)}>
          NEW
        </button>
      </div>

      <VMTable vms={vms} />

      {isWizardOpen && (
        <VMWizard onClose={() => setIsWizardOpen(false)} onCreate={handleCreateVM} />
      )}
    </div>
  );
};

export default VirtualMachines;
