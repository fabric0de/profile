'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='min-h-[400px] flex items-center justify-center p-8'>
          <div className='text-center'>
            <AlertTriangle className='h-16 w-16 text-red-500 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Something went wrong
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              We're sorry, but something unexpected happened. Please try again.
            </p>
            <button
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
              className='btn-primary inline-flex items-center space-x-2'
            >
              <RefreshCw className='h-4 w-4' />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
