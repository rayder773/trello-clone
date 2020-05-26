import PropTypes from 'prop-types';
import React from 'react';

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;

ErrorFallback.propTypes = {
  componentStack: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
