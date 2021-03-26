import { combineReducers } from 'redux'
import elasticAdaptive from 'store/reducers/elasticAdaptive'
import { uiReducer } from 'store/reducers/ui'
import { authReducer } from 'store/reducers/auth'
import { filterReducer } from 'store/reducers/filtration'

const rootReducer = combineReducers({
  elastic: elasticAdaptive,
  ui: uiReducer,
  auth: authReducer,
  filter: filterReducer,
})

export default rootReducer
