import { renderHook, waitFor } from '@testing-library/react';
import useCategory from '../useCategory';

// Mock axios module
jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Import axios after mocking
import axios from 'axios';

// Mock console.log to avoid cluttering test output
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('useCategory Hook', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  // Restore console.log after all tests
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('Initial State', () => {
    it('should initialize with empty categories array', () => {
      const { result } = renderHook(() => useCategory());
      
      expect(result.current).toEqual([]);
    });
  });

  describe('API Call on Mount', () => {
    it('should call get-category API when hook mounts', async () => {
      // Mock successful API response
      const mockCategories = [
        { _id: '1', name: 'Electronics' },
        { _id: '2', name: 'Clothing' }
      ];
      
      axios.get.mockResolvedValueOnce({
        data: { category: mockCategories }
      });

      renderHook(() => useCategory());

      // Wait for the API call to complete
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('/api/v1/category/get-category');
      });
    });

    it('should update categories state with API response data', async () => {
      const mockCategories = [
        { _id: '1', name: 'Electronics' },
        { _id: '2', name: 'Clothing' }
      ];
      
      axios.get.mockResolvedValueOnce({
        data: { category: mockCategories }
      });

      const { result } = renderHook(() => useCategory());

      // Wait for the state to update
      await waitFor(() => {
        expect(result.current).toEqual(mockCategories);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      axios.get.mockRejectedValueOnce(mockError);

      renderHook(() => useCategory());

      // Wait for the API call to complete
      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(mockError);
      });
    });

    it('should maintain empty categories array on API error', async () => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));

      const { result } = renderHook(() => useCategory());

      // Wait for the API call to complete
      await waitFor(() => {
        expect(result.current).toEqual([]);
      });
    });
  });

  describe('Data Structure Handling', () => {
    it('should handle undefined category data gracefully', async () => {
      // Mock response with undefined category
      axios.get.mockResolvedValueOnce({
        data: { category: undefined }
      });

      const { result } = renderHook(() => useCategory());

      await waitFor(() => {
        expect(result.current).toEqual(undefined);
      });
    });

    it('should handle null category data gracefully', async () => {
      // Mock response with null category
      axios.get.mockResolvedValueOnce({
        data: { category: null }
      });

      const { result } = renderHook(() => useCategory());

      await waitFor(() => {
        expect(result.current).toEqual(null);
      });
    });

    it('should handle empty category array', async () => {
      // Mock response with empty array
      axios.get.mockResolvedValueOnce({
        data: { category: [] }
      });

      const { result } = renderHook(() => useCategory());

      await waitFor(() => {
        expect(result.current).toEqual([]);
      });
    });
  });

  describe('Hook Behavior', () => {
    it('should only make API call once on mount', async () => {
      axios.get.mockResolvedValueOnce({
        data: { category: [] }
      });

      renderHook(() => useCategory());

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
    });

    it('should return the same reference for categories on re-renders', async () => {
      const mockCategories = [{ _id: '1', name: 'Test' }];
      
      axios.get.mockResolvedValueOnce({
        data: { category: mockCategories }
      });

      const { result, rerender } = renderHook(() => useCategory());

      await waitFor(() => {
        expect(result.current).toEqual(mockCategories);
      });

      const firstResult = result.current;
      
      // Re-render the hook
      rerender();

      // The result should be the same reference
      expect(result.current).toBe(firstResult);
    });
  });

  describe('Edge Cases', () => {
    it('should handle network timeout scenarios', async () => {
      const timeoutError = new Error('Network timeout');
      timeoutError.code = 'ECONNABORTED';
      
      axios.get.mockRejectedValueOnce(timeoutError);

      renderHook(() => useCategory());

      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(timeoutError);
      });
    });

    it('should handle malformed API response', async () => {
      // Mock response without expected structure
      axios.get.mockResolvedValueOnce({
        data: { wrongField: [] }
      });

      const { result } = renderHook(() => useCategory());

      await waitFor(() => {
        expect(result.current).toEqual(undefined);
      });
    });
  });
});
