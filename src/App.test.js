import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

React.test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  React.expect(linkElement).toBeInTheDocument();
});
