import { render, screen } from '@testing-library/react';
import App from './App';

test('renders credit card details form', () => {
  render(<App />);
  const labelElement = screen.getByText(/CARDHOLDER NAME/i);
  expect(labelElement).toBeInTheDocument();
  const buttonElement = screen.getByRole('button', { name: /confirm/i });
  expect(buttonElement).toBeInTheDocument();
});
