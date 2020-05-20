import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ErrorBoundary } from 'react-error-boundary';
import MainPage from './pages/MainPage';
import reducer from './store/reducers';
import ErrorFallback from './components/ErrorFallback';
import Header from './components/Header';
import './assets/style/global.scss';
import RouteWrapper from './containers/RouteWrapper';
import Layout from './containers/Layout/Layout';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router>
          <Switch>
            <RouteWrapper path='/' layout={Layout} component={MainPage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
