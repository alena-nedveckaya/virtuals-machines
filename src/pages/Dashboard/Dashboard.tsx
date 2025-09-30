import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { addVM } from '@/store/slices/vmSlice';
import { StateCard, TrendCard, VMTable, VMWizard } from '@/components';
import './Dashboard.css';

const Dashboard = () => {
  const { vms } = useAppSelector((state) => state.vms);
  const dispatch = useAppDispatch();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleCreateVM = (vmData: any) => {
    dispatch(addVM(vmData));
    setIsWizardOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <StateCard vms={vms} />
        <TrendCard />
      </div>

      <div className="vm-section">
        <div className="vm-section-header">
          <h2>Virtual machines {vms.length}</h2>
          <button className="new-vm-btn" onClick={() => setIsWizardOpen(true)}>
            + New
          </button>
        </div>
        <VMTable vms={vms} />
      </div>

      {isWizardOpen && (
        <VMWizard onClose={() => setIsWizardOpen(false)} onCreate={handleCreateVM} />
      )}
    </div>
  );
};

export default Dashboard;
