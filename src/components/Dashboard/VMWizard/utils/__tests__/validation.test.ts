import { validateStep1, validateStep2, validateStep } from '../validation';
import { type WizardForm } from '../../VMWizard';

describe('Wizard Validation', () => {
  const mockFormData: WizardForm = {
    name: '',
    cpu: undefined,
    memory: undefined,
    enableVirtualizedCPU: false,
  };

  describe('validateStep1', () => {
    it('should return error for empty name', () => {
      const result = validateStep1(mockFormData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Name is required');
    });

    it('should return error for name too long', () => {
      const longName = 'a'.repeat(81);
      const result = validateStep1({ ...mockFormData, name: longName });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Name is too long');
    });

    it('should pass validation for valid name', () => {
      const result = validateStep1({ ...mockFormData, name: 'Valid VM Name' });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('validateStep2', () => {
    it('should return error for missing CPU', () => {
      const result = validateStep2(mockFormData);
      expect(result.isValid).toBe(false);
      expect(result.errors.cpu).toBe('CPU is required');
    });

    it('should return error for CPU out of range', () => {
      const result = validateStep2({ ...mockFormData, cpu: 15 });
      expect(result.isValid).toBe(false);
      expect(result.errors.cpu).toBe('CPU must be between 1 and 12');
    });

    it('should return error for missing memory', () => {
      const result = validateStep2({ ...mockFormData, cpu: 4 });
      expect(result.isValid).toBe(false);
      expect(result.errors.memory).toBe('Memory is required');
    });

    it('should return error for memory out of range', () => {
      const result = validateStep2({ ...mockFormData, cpu: 4, memory: 60 });
      expect(result.isValid).toBe(false);
      expect(result.errors.memory).toBe('Memory must be between 1 and 50');
    });

    it('should pass validation for valid values', () => {
      const result = validateStep2({ ...mockFormData, cpu: 4, memory: 8 });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe('validateStep', () => {
    it('should validate step 1', () => {
      const result = validateStep(1, mockFormData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBe('Name is required');
    });

    it('should validate step 2', () => {
      const result = validateStep(2, mockFormData);
      expect(result.isValid).toBe(false);
      expect(result.errors.cpu).toBe('CPU is required');
    });

    it('should return valid for other steps', () => {
      const result = validateStep(3, mockFormData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });
});
