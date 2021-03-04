import {
  RESET_FILTERS,
  SET_CATEGORY_FILTER_VALUE, SET_DRIVERS_FILTER_VALUE,
  SET_OWNER_FILTER_VALUE, SET_STATUS_FILTER_VALUE
} from 'store/actions/actionTypes'
import { updateObject } from 'utils'

const initialState = {
  activeOwner: null,
  activeCategory: null,
  activeStatus: null,
  activeDrivers: null,
}

export const filterReduces = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FILTERS:
      return updateObject(state, {...action.payload})
    case SET_OWNER_FILTER_VALUE:
      return updateObject(state, {activeOwner: action.payload})
    case SET_STATUS_FILTER_VALUE:
      return updateObject(state, {activeStatus: action.payload})
    case SET_CATEGORY_FILTER_VALUE:
      return updateObject(state, {activeCategory: action.payload})
    case SET_DRIVERS_FILTER_VALUE:
      return updateObject(state, {activeDrivers: action.payload})
    default:
      return state
  }
}
