import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'store/reducers/_index'

export default function configureStore () {
  return createStore(rootReducer,applyMiddleware(thunk))
}
