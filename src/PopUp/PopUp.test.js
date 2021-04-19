import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import PopUp from './PopUp.js';

test('renders app', () => {
  render(<BrowserRouter><PopUp /></BrowserRouter>);
  const linkElement = screen.getByText(/to use this feature/i);
  expect(linkElement).toBeInTheDocument();
});
