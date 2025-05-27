import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/utils/testSetup.js'],
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    deps: {
      optimizer: {
        web: {
          include: ['react', 'react-dom', 'react-router-dom', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/dom']
        }
      }
    }
  }
}); 