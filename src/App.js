import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import MainPage from './pages/MainPage';
import reducer from './store/reducers';
import './assets/style/global.scss';
import RouteWrapper from './containers/RouteWrapper';
import Layout from './containers/Layout/Layout';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <RouteWrapper path="/" layout={Layout} component={MainPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
