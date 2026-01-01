import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-light-bg)] text-[var(--color-primary-green)] p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-accent-purple)]">
              WebGL Error
            </h2>
            <p className="text-[var(--color-muted-green)] mb-4">
              The background animation couldn't load. This might be due to:
            </p>
            <ul className="text-left text-sm text-[var(--color-muted-green)] mb-4 space-y-2">
              <li>• WebGL not supported in your browser</li>
              <li>• Graphics driver issues</li>
              <li>• Hardware acceleration disabled</li>
            </ul>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-[var(--color-primary-green)] text-[var(--color-light-bg)] rounded hover:opacity-80 transition"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

