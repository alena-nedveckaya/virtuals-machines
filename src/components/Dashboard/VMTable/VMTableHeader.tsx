import { useState } from 'react';
import { Icon } from '@/components';
import { type SortField, type SortDirection } from '../types';

import classes from './VMTable.module.scss';

interface VMTableHeaderProps {
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const VMTableHeader = ({ sortField, sortDirection, onSort }: VMTableHeaderProps) => {
  const [isActiveField, setIsActiveField] = useState({} as Record<SortField, boolean>);
  const handleSort = (field: SortField) => {
    onSort(field);
    setIsActiveField((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getSortIcon = (field: SortField) => {
    const isActive = isActiveField[field];
    return (
      <Icon
        name="arrows"
        size={12}
        onClick={() => handleSort(field)}
        color={isActive ? 'var(--brand-primary)' : '#6b7280'}
        style={{
          transform: isActive ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      />
    );
  };

  return (
    <thead>
      <tr>
        <th className={classes.header}>ID</th>
        <th className={`${classes.header} ${classes.sortable}`}>
          <span className={classes.headerText}>State</span>
          {getSortIcon('status')}
        </th>
        <th className={classes.header}>Host server</th>
        <th className={`${classes.header} ${classes.sortable}`}>
          <span className={classes.headerText}>CPU</span>
          {getSortIcon('cpu')}
        </th>
        <th className={`${classes.header} ${classes.sortable}`}>
          <span className={classes.headerText}>Memory</span>
          {getSortIcon('memory')}
        </th>
        <th className={`${classes.header} ${classes.sortable}`}>
          <span className={classes.headerText}>Uptime</span>
          {getSortIcon('uptime')}
        </th>
        <th className={classes.header}>Alerts</th>
      </tr>
    </thead>
  );
};

export default VMTableHeader;
