import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage.js';

test('renders LandingPage', () => {
  render(
    <BrowserRouter>
        <LandingPage />
    </BrowserRouter>
);
  const linkElement = screen.getByText(/got to go but don't know where to go/i);
  expect(linkElement).toBeInTheDocument();
});
