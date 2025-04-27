import { Outlet } from 'react-router';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import ErrorBoundary from '../error/ErrorBoundry';

export const MasterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    
      <main className="flex-grow container mx-auto px-4 py-8 mt-10">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}; 