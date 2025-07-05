import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an error reporting service if needed
    // console.error(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-dark">
          <h1 className="text-3xl font-bold text-error mb-4">Something went wrong.</h1>
          <p className="mb-4">An unexpected error occurred. Please try reloading the page.</p>
          <button onClick={this.handleReload} className="px-4 py-2 bg-primary-500 text-white rounded-lg font-bold">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 