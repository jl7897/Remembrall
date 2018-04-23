import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import reducers from './reducers';
import App from './components/App';
import Home from './components/Home';
import SiderDemo from './components/demo';
import './style.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  (
  <Provider store={createStoreWithMiddleware(reducers)} >
    <BrowserRouter>
      <div>
        <Route exact path='/' component={App}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/demo' component={SiderDemo}/>
      </div>
  </BrowserRouter>
  </Provider>
  ), document.getElementById('app')
);
