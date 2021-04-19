import { render, screen } from '@testing-library/react';
import BathroomInfo from './BathroomInfo.js';

test('renders app', () => {
  render(<BathroomInfo />);
  const linkElement = screen.getByText(/Bathroom Info Page/i);
  expect(linkElement).toBeInTheDocument();
});
