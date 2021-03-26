import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'store/reducers/_index'

function configureStore () {
  const store = createStore(rootReducer,applyMiddleware(thunk))
}
