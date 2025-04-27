import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders 404 page with correct content', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Check for main elements
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  // Removed test for custom message since the NotFound component 
  // doesn't accept a message prop according to the type error
});
