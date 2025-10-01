import { useState, useMemo } from 'react';
import type { VM } from '@/store/slices/vmSlice';
import type { SortField, SortDirection } from './types';

export const useVMSorting = (vms: VM[]) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedVMs = useMemo(() => {
    if (!sortField) return vms;

    return [...vms].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'cpu':
          aValue = a.cpu;
          bValue = b.cpu;
          break;
        case 'memory':
          aValue = a.memory;
          bValue = b.memory;
          break;
        case 'uptime':
          aValue = a.uptime;
          bValue = b.uptime;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [vms, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    handleSort,
    sortedVMs,
  };
};

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  };

  return { copy, isCopied };
};
