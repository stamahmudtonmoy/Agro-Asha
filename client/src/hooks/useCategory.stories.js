import React from 'react';
import { useCategory } from './useCategory';

// Mock the hook for Storybook
const mockUseCategory = (mockData) => {
  // Override the hook for story purposes
  const originalHook = useCategory;
  
  // Return mock data for stories
  return mockData || [];
};

// Story decorator to provide mock data
const withMockData = (mockData) => (Story) => (
  <div style={{ padding: '20px' }}>
    <Story mockData={mockData} />
  </div>
);

// Basic usage story
export const Default = () => {
  const categories = mockUseCategory([
    { _id: '1', name: 'Electronics', description: 'Electronic devices and gadgets' },
    { _id: '2', name: 'Clothing', description: 'Fashion and apparel' },
    { _id: '3', name: 'Books', description: 'Books and literature' }
  ]);

  return (
    <div>
      <h2>Categories List</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {categories.map(category => (
          <div 
            key={category._id} 
            style={{ 
              padding: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{category.name}</h3>
            <p style={{ margin: '0', color: '#666' }}>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Empty state story
export const EmptyState = () => {
  const categories = mockUseCategory([]);

  return (
    <div>
      <h2>No Categories Available</h2>
      {categories.length === 0 ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          color: '#666',
          border: '2px dashed #ddd',
          borderRadius: '8px'
        }}>
          <p>No categories found</p>
          <p>Categories will appear here once they are added to the system.</p>
        </div>
      ) : (
        <div>Categories loaded successfully</div>
      )}
    </div>
  );
};

// Loading state story
export const LoadingState = () => {
  const categories = mockUseCategory(null); // Simulate loading

  return (
    <div>
      <h2>Loading Categories</h2>
      {categories === null ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          color: '#666'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px auto'
          }}></div>
          <p>Loading categories...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div>Categories loaded</div>
      )}
    </div>
  );
};

// Error state story
export const ErrorState = () => {
  const categories = mockUseCategory([]); // Empty array on error

  return (
    <div>
      <h2>Error Loading Categories</h2>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '8px',
        color: '#c33'
      }}>
        <h3>⚠️ Error</h3>
        <p>Failed to load categories. Please try again later.</p>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#c33', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Retry
        </button>
      </div>
      <p>Current categories: {categories.length}</p>
    </div>
  );
};

// Grid layout story
export const GridLayout = () => {
  const categories = mockUseCategory([
    { _id: '1', name: 'Electronics', icon: '📱' },
    { _id: '2', name: 'Clothing', icon: '👕' },
    { _id: '3', name: 'Books', icon: '📚' },
    { _id: '4', name: 'Sports', icon: '⚽' },
    { _id: '5', name: 'Home', icon: '🏠' },
    { _id: '6', name: 'Food', icon: '🍕' }
  ]);

  return (
    <div>
      <h2>Categories Grid</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px 0'
      }}>
        {categories.map(category => (
          <div 
            key={category._id} 
            style={{ 
              padding: '20px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '12px',
              backgroundColor: 'white',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{category.icon}</div>
            <h3 style={{ margin: '0', color: '#333' }}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Story metadata
export default {
  title: 'Hooks/useCategory',
  component: Default,
  parameters: {
    docs: {
      description: {
        component: `
## useCategory Hook

A custom React hook for managing categories data. This hook automatically fetches categories when the component mounts and provides them to components.

### Features
- Automatic data fetching on mount
- Built-in error handling
- State management
- Optimized re-renders

### Usage
\`\`\`jsx
import { useCategory } from './hooks/useCategory';

function CategoryList() {
  const categories = useCategory();
  
  return (
    <div>
      {categories.map(category => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
}
\`\`\`
        `
      }
    }
  },
  decorators: [withMockData],
  argTypes: {
    mockData: {
      control: 'object',
      description: 'Mock data to simulate different hook states'
    }
  }
};
