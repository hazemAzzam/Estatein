"use client";
import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6 p-8">
          <div className="text-6xl text-red-500">
            <AlertTriangle />
          </div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-gray-60 max-w-md">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-60 text-white rounded-lg hover:bg-purple-65 transition-colors"
          >
            <RefreshCw size={20} />
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 text-left max-w-2xl">
              <summary className="cursor-pointer text-sm text-gray-60">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-4 bg-gray-15 rounded text-xs overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}


