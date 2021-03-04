import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import 'styles/common.scss'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import elasticAdaptive from 'store/reducers/elasticAdaptive'
import thunk from 'redux-thunk'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { uiReducer } from 'store/reducers/ui'
import ViewSwitcher from 'ViewSwitcher/ViewSwitcher'
import { filterReduces } from 'store/reducers/filtration'

const rootReducer = combineReducers({
  elastic: elasticAdaptive,
  ui: uiReducer,
  filter: filterReduces
})

const store = createStore(rootReducer,applyMiddleware(thunk))

const Content = (
  <Provider store={store}>
    <HashRouter>
      <ViewSwitcher />
    </HashRouter>
  </Provider>
)

ReactDOM.render(Content, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
