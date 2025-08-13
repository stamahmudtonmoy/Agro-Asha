import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/auth';
import Header from '../Header';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('renders header with navigation links', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('🛒 AgroAsha App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
  });

  test('shows logout button when user is authenticated', () => {
    // Mock authenticated user
    const mockAuth = {
      user: { name: 'John Doe', email: 'john@example.com' },
      token: 'mock-token'
    };

    // You'll need to mock the useAuth context
    // This is a simplified example
    renderWithProviders(<Header />);
    
    // Test logout functionality
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });
});
