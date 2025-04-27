import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router';
import rootConfig from '@/config';
import {
  RotateCw,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isErrorInfoExpanded: boolean;
}


class ErrorBoundary extends Component<Props, State> {
 
  private environment = rootConfig.env;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isErrorInfoExpanded: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      isErrorInfoExpanded: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.log('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <>
        <div className="mt-16 mb-12 flex items-center justify-center px-4">
          <div className="text-center flex items-center justify-center gap-8">
            <div className="flex justify-center mb-6 font-nyt font-bold text-7xl p-4">
              500
            </div>
            <div className='text-left border-l-2 border-primary pl-4'>
              <h3 className="text-2xl font-nyt font-bold">Oops! that's our bad</h3>
              <p className="text-lg text-zinc-600 mb-6">
                We're not sure what went wrong. Please try again later. if you need immediate assistance, please contact support.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors mb-4">
                <RotateCw className="w-4 h-4" />
                 <span>Try Again</span>
              </Link>
            </div>
          </div>
        </div>
         {this.environment === 'local' && (
          <div className="border border-red-500 mb-4 p-1 bg-red-50 rounded" >
            <div onClick={() => this.setState({ isErrorInfoExpanded: !this.state.isErrorInfoExpanded })}
             className="flex items-center bg-red-100 p-3 justify-between gap-2 text-red-600">
              <p>Error: {this.state.error?.message}</p>
              <div className="flex items-center gap-2">
                {this.state.isErrorInfoExpanded ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </div>
            </div>
            {this.state.error?.stack && this.state.isErrorInfoExpanded && (
                <div className="flex max-w-lg items-center gap-2 p-4 w-full">
                  <pre className="text-xs text-red-600">{this.state.error.stack}</pre>
                </div>
              )}
          </div>
        )}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
