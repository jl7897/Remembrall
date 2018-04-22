import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducers';
import App from './components/App';
import './style.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  (
  <Provider store={createStoreWithMiddleware(reducers)} >
    <BrowserRouter>
      <div>
        <Route exact path='/' component={App}/>
      </div>
  </BrowserRouter>
  </Provider>
  ), document.getElementById('app')
);
