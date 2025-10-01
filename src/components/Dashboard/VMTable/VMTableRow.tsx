import type { VM } from '@/store/slices/vmSlice';
import { Icon, ProgressBar } from '@/components';
import type { AlertType } from '../types';
import { getStatusClass, getAlertConfig, getAlertText } from '../utils';
import { useCopyToClipboard } from '../hooks';

import classes from './VMTable.module.scss';

interface VMTableRowProps {
  vm: VM;
}

const VMTableRow = ({ vm }: VMTableRowProps) => {
  const { copy } = useCopyToClipboard();

  const getAlertIcon = (type: AlertType) => {
    const config = getAlertConfig(type);
    return <Icon name={config.icon} size={20} color={config.color} />;
  };

  return (
    <tr className={classes.row}>
      <td className={classes.cell}>
        <div className={classes.idContainer}>
          <button className={classes.copyButton} onClick={() => copy(vm.id)} title="Copy ID">
            <Icon name="copy" size={16} />
          </button>
          <span className={classes.id}>{vm.id}</span>
        </div>
      </td>
      <td className={classes.cell}>
        <span className={`${classes.status} ${classes[getStatusClass(vm.status)]}`}>
          {vm.status}
        </span>
      </td>
      <td className={classes.cell}>{vm.hostServer}</td>
      <td className={classes.cell}>
        <div className={classes.resource}>
          <span className={classes.value}>{vm.cpu} CPU</span>
          <ProgressBar value={vm.cpu} max={12} />
        </div>
      </td>
      <td className={classes.cell}>
        <div className={classes.resource}>
          <span className={classes.value}>{vm.memory} GiB</span>
          <ProgressBar value={vm.memory} max={50} />
        </div>
      </td>
      <td className={classes.cell}>{vm.uptime}</td>
      <td className={classes.cell}>
        <div className={classes.alert}>
          {getAlertIcon(vm.alerts.type)}
          <span className={classes.alertText}>{getAlertText(vm.alerts)}</span>
        </div>
      </td>
    </tr>
  );
};

export default VMTableRow;
