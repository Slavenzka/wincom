import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import 'styles/common.scss'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import ViewSwitcher from 'ViewSwitcher/ViewSwitcher'
import configureStore from 'store/configureStore'

const store = configureStore()

const Content = (
  <Provider store={store}>
    <BrowserRouter>
      <ViewSwitcher />
    </BrowserRouter>
  </Provider>
)

const rootNode = document.getElementById('root')

ReactDOM.render(Content, rootNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
