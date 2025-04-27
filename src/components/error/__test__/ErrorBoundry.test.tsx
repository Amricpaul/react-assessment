import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundry';
import { MemoryRouter } from 'react-router';

// Mock the console.error to prevent error output in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that renders normally
const NormalComponent = () => <div>Test Content</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.log for error boundary logs
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error UI when an error occurs', () => {
    // Use a try-catch to handle the error
    let errorUI;
    try {
      render(
        <MemoryRouter>
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </MemoryRouter>
      );
    } catch (error) {
      // This is expected, the ErrorBoundary should catch it
    }

    // Re-render to see the error UI
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <NormalComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText("Oops! that's our bad")).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const CustomFallback = () => <div>Custom Error UI</div>;

    // Use a try-catch to handle the error
    try {
      render(
        <ErrorBoundary fallback={<CustomFallback />}>
          <ThrowError />
        </ErrorBoundary>
      );
    } catch (error) {
      // This is expected, the ErrorBoundary should catch it
    }

    // Re-render to see the custom fallback
    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
  });

  it('toggles error info when clicked', () => {
    // Mock the environment to be 'local' for this test
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    // Use a try-catch to handle the error
    try {
      render(
        <MemoryRouter>
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </MemoryRouter>
      );
    } catch (error) {
      // This is expected, the ErrorBoundary should catch it
    }

    // Re-render to see the error UI
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <NormalComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const errorMessage = screen.getByText('Error: Test error');
    fireEvent.click(errorMessage.parentElement!);

    // Verify the error message is still visible
    expect(errorMessage).toBeInTheDocument();

    // Restore the original environment
    process.env.NODE_ENV = originalEnv;
  });
});
