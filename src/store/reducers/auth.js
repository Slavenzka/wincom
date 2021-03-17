import { SET_AUTH_STATUS } from 'store/actions/actionTypes'
import { updateObject } from 'utils'

const INITIAL_STATE = {
  isAuthorized: false
}

export const authReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_AUTH_STATUS:
      return updateObject(state, {isAuthorized: payload})
    default:
      return state
  }
}
