import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface VM {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'pending';
  hostServer: string;
  cpu: number;
  memory: number;
  storage: number;
  os: string;
  uptime: string;
  alerts: {
    type: 'critical' | 'important' | 'moderate' | 'good';
    count: number;
  };
  createdAt: string;
}

interface VMState {
  vms: VM[];
}

const initialState: VMState = {
  vms: [
    {
      id: '3ad83858-e748-11ee',
      name: 'Web Server',
      status: 'running',
      hostServer: '43C07-27',
      cpu: 7.72,
      memory: 16.68,
      storage: 50,
      os: 'Ubuntu 22.04',
      uptime: '4:12:41:09',
      alerts: { type: 'important', count: 3 },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3ad83859-e748-11ee',
      name: 'Database Server',
      status: 'stopped',
      hostServer: '43C07-27',
      cpu: 2.24,
      memory: 21.68,
      storage: 100,
      os: 'CentOS 8',
      uptime: '4:12:41:09',
      alerts: { type: 'critical', count: 3 },
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: '3ad8385a-e748-11ee',
      name: 'Development VM',
      status: 'running',
      hostServer: '43C07-27',
      cpu: 6.74,
      memory: 45.38,
      storage: 25,
      os: 'Ubuntu 20.04',
      uptime: '4:12:41:09',
      alerts: { type: 'moderate', count: 5 },
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: '3ad8385b-e748-11ee',
      name: 'Test Server',
      status: 'running',
      hostServer: '43C07-26',
      cpu: 5.72,
      memory: 5.68,
      storage: 30,
      os: 'Windows Server 2019',
      uptime: '4:12:41:09',
      alerts: { type: 'good', count: 0 },
      createdAt: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: '3ad8385c-e748-11ee',
      name: 'Backup Server',
      status: 'stopped',
      hostServer: '43C07-23',
      cpu: 2.24,
      memory: 21.68,
      storage: 200,
      os: 'CentOS 7',
      uptime: '4:12:41:09',
      alerts: { type: 'critical', count: 1 },
      createdAt: new Date(Date.now() - 432000000).toISOString(),
    },
  ],
};

const vmSlice = createSlice({
  name: 'vms',
  initialState,
  reducers: {
    addVM: (state, action: PayloadAction<Omit<VM, 'id' | 'createdAt'>>) => {
      const newVM: VM = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.vms.push(newVM);
    },
    updateVM: (state, action: PayloadAction<{ id: string; updates: Partial<VM> }>) => {
      const index = state.vms.findIndex(vm => vm.id === action.payload.id);
      if (index !== -1) {
        state.vms[index] = { ...state.vms[index], ...action.payload.updates };
      }
    },
    deleteVM: (state, action: PayloadAction<string>) => {
      state.vms = state.vms.filter(vm => vm.id !== action.payload);
    },
  },
});

export const { addVM, updateVM, deleteVM } = vmSlice.actions;
export default vmSlice.reducer;
