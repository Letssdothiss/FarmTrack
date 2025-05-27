import '@testing-library/jest-dom';
import { vi } from 'vitest';
// import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Define global in the window context
window.localStorage = localStorageMock;

// Add React 18 specific setup
global.IS_REACT_ACT_ENVIRONMENT = true;

// Create a custom render function that includes the router
const customRender = (ui, options = {}) => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 