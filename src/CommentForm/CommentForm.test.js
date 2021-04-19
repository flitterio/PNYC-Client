import { render, screen } from '@testing-library/react';
import CommentForm from './CommentForm';

test('renders app', () => {
  render(<CommentForm />);
  const linkElement = screen.getByText(/post comment/i);
  expect(linkElement).toBeInTheDocument();
});
