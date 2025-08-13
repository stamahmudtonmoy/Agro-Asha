/**
 * TypeScript definitions for the useCategory hook
 */

/**
 * Category object structure returned by the API
 */
export interface Category {
  /** Unique identifier for the category */
  _id: string;
  /** Display name of the category */
  name: string;
  /** Optional description of the category */
  description?: string;
  /** Optional icon or image for the category */
  icon?: string;
  /** Optional slug for URL routing */
  slug?: string;
  /** Optional parent category ID for hierarchical categories */
  parentId?: string;
  /** Optional metadata for the category */
  metadata?: Record<string, any>;
  /** Creation timestamp */
  createdAt?: string;
  /** Last update timestamp */
  updatedAt?: string;
}

/**
 * API response structure for categories
 */
export interface CategoryApiResponse {
  /** Array of categories */
  category: Category[];
  /** Optional success message */
  message?: string;
  /** Optional pagination info */
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Hook return type
 */
export type UseCategoryReturn = Category[];

/**
 * Custom React hook for managing categories data
 * 
 * @returns {UseCategoryReturn} Array of category objects
 * 
 * @example
 * ```tsx
 * function CategoryList() {
 *   const categories = useCategory();
 *   
 *   return (
 *     <div>
 *       {categories.map(category => (
 *         <div key={category._id}>{category.name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useCategory(): UseCategoryReturn;

/**
 * Hook options for future extensibility
 */
export interface UseCategoryOptions {
  /** Whether to auto-fetch on mount (default: true) */
  autoFetch?: boolean;
  /** Custom API endpoint (default: '/api/v1/category/get-category') */
  endpoint?: string;
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
  /** Whether to enable caching */
  enableCache?: boolean;
  /** Cache TTL in milliseconds */
  cacheTTL?: number;
}

/**
 * Enhanced hook with options (future implementation)
 */
export interface UseCategoryEnhanced {
  /** Array of categories */
  categories: Category[];
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: Error | null;
  /** Refresh function */
  refresh: () => Promise<void>;
  /** Clear error function */
  clearError: () => void;
}

/**
 * Future enhanced hook signature
 */
export declare function useCategoryEnhanced(options?: UseCategoryOptions): UseCategoryEnhanced;

// Export all types
export type {
  Category,
  CategoryApiResponse,
  UseCategoryReturn,
  UseCategoryOptions,
  UseCategoryEnhanced
};
