import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { Button, Icon, StateCard, TrendCard, VMTable, VMWizard } from '@/components';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { vms } = useAppSelector((state) => state.vms);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <StateCard vms={vms} />
        <TrendCard />
      </div>

      <div className={classes.vmSection}>
        <div className={classes.header}>
          <h2 className={classes.title}>Virtual machines {vms.length}</h2>
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsWizardOpen(true)}
            className={classes.newVmBtn}
          >
            <Icon name="plus" size={16} color="white" />{' '}
            <span className={classes.newVmBtnText}>New</span>
          </Button>
        </div>
        <VMTable vms={vms} />
      </div>

      {isWizardOpen && <VMWizard onClose={() => setIsWizardOpen(false)} />}
    </div>
  );
};

export default Dashboard;
