import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import ErrorFallback from './components/ErrorFallback';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
