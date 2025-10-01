import vmSlice, { addVM, clearError, createVM, type VM } from '../vmSlice';

const mockVM: Omit<VM, 'id' | 'createdAt'> = {
  name: 'Test VM',
  status: 'running',
  hostServer: 'server-1',
  cpu: 2,
  memory: 4,
  storage: 20,
  os: 'Ubuntu 20.04',
  uptime: '1:00:00:00',
  alerts: {
    type: 'good',
    count: 0,
  },
};

describe('vmSlice', () => {
  it('should return the initial state', () => {
    const result = vmSlice(undefined, { type: 'unknown' });
    expect(result.loading).toBe(false);
    expect(result.error).toBeNull();
    expect(Array.isArray(result.vms)).toBe(true);
  });

  it('should handle addVM', () => {
    const initialState = vmSlice(undefined, { type: 'unknown' });
    const actual = vmSlice(initialState, addVM(mockVM));
    expect(actual.vms.length).toBeGreaterThan(initialState.vms.length);
    const newVM = actual.vms[actual.vms.length - 1];
    expect(newVM).toMatchObject(mockVM);
    expect(newVM.id).toBeDefined();
    expect(newVM.createdAt).toBeDefined();
  });

  it('should handle clearError', () => {
    const stateWithError = {
      vms: [],
      loading: false,
      error: 'Some error',
    };
    const actual = vmSlice(stateWithError, clearError());
    expect(actual.error).toBeNull();
  });

  it('should handle createVM.pending', () => {
    const initialState = vmSlice(undefined, { type: 'unknown' });
    const actual = vmSlice(initialState, createVM.pending('', mockVM));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle createVM.fulfilled', () => {
    const pendingState = {
      vms: [],
      loading: true,
      error: null,
    };
    const newVM: VM = {
      ...mockVM,
      id: 'vm-123',
      createdAt: '2023-01-01T00:00:00.000Z',
    };

    const actual = vmSlice(pendingState, createVM.fulfilled(newVM, '', mockVM));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBeNull();
    expect(actual.vms).toHaveLength(1);
    expect(actual.vms[0]).toEqual(newVM);
  });

  it('should handle createVM.rejected', () => {
    const pendingState = {
      vms: [],
      loading: true,
      error: null,
    };
    const errorMessage = 'Failed to create VM';

    const actual = vmSlice(
      pendingState,
      createVM.rejected(new Error(errorMessage), '', mockVM, errorMessage),
    );
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(errorMessage);
    expect(actual.vms).toHaveLength(0);
  });
});
