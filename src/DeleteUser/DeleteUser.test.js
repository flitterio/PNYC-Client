import { render, screen } from '@testing-library/react';
import DeleteUser from './DeleteUser';

test('renders DeleteUser', () => {
  render(<DeleteUser />);
  const linkElement = screen.getByText(/are you sure you want to delete your profile/i);
  expect(linkElement).toBeInTheDocument();
});
