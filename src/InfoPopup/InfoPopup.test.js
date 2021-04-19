import { render, screen } from '@testing-library/react';
import InfoPopup from './InfoPopup.js';

test('renders InfoPopup', () => {
  render(<InfoPopup />);
  const linkElement = screen.getByText(/to add a bathroom/i);
  expect(linkElement).toBeInTheDocument();
});
