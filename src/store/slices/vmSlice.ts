import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { mockVMs } from '@/data/mockVMs';

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
  loading: boolean;
  error: string | null;
}

// Async thunk for creating VM
export const createVM = createAsyncThunk(
  'vms/createVM',
  async (vmData: Pick<VM, 'name' | 'cpu' | 'memory'>, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate backend response
      const newVM: VM = {
        ...vmData,
        id: `vm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        status: 'running' as const,
        uptime: '0:00:00:00',
        alerts: { type: 'good' as const, count: 0 },
        storage: 10,
        os: 'Ubuntu 20.04',
        hostServer: '43C07-27',
      };

      // Simulate random success/failure (90% success rate)
      if (Math.random() < 0.9) {
        return newVM;
      } else {
        throw new Error('Failed to create VM');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);

const initialState: VMState = {
  vms: mockVMs,
  loading: false,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVM.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVM.fulfilled, (state, action) => {
        state.loading = false;
        state.vms.push(action.payload);
        state.error = null;
      })
      .addCase(createVM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addVM, clearError } = vmSlice.actions;
export default vmSlice.reducer;
