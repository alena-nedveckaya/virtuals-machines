import { type VM } from '@/store/slices/vmSlice';
import classes from './VMTable.module.scss';
import { useVMSorting } from '../hooks';
import VMTableHeader from './VMTableHeader';
import VMTableRow from './VMTableRow';

interface VMTableProps {
  vms: VM[];
}

const VMTable = ({ vms }: VMTableProps) => {
  const { handleSort, sortedVMs } = useVMSorting(vms);

  if (vms.length === 0) {
    return (
      <div className={classes.empty}>
        <p>No virtual machines found. Click "NEW" to create your first VM.</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <VMTableHeader onSort={handleSort} />
        <tbody>
          {sortedVMs.map((vm) => (
            <VMTableRow key={vm.id} vm={vm} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VMTable;
