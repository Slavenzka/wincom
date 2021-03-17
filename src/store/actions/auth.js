import { SET_AUTH_STATUS } from 'store/actions/actionTypes'

export const setAuthStatus = status => ({
  type: SET_AUTH_STATUS,
  payload: status
})
