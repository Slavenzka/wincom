import {
  RESET_FILTERS, SET_DATE_FILTER_VALUE,
  SET_FILTERED_DATA,
  SET_PRIMARY_FILTER_VALUE,
  SET_SECONDARY_FILTER_VALUE,
} from 'store/actions/actionTypes'
import { updateObject } from 'utils'

const initialState = {
  activeDate: null,
  activePrimary: null,
  activeSecondary: null,
  detailedFilter: null,
  filteredData: null,
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FILTERS:
      return updateObject(state, {...action.payload})
    case SET_DATE_FILTER_VALUE:
      return updateObject(state, {activeDate: action.payload})
    case SET_PRIMARY_FILTER_VALUE:
      return updateObject(state, {activePrimary: action.payload})
    case SET_SECONDARY_FILTER_VALUE:
      return updateObject(state, {activeSecondary: action.payload})
    case SET_FILTERED_DATA:
      return updateObject(state, {filteredData: action.payload})
    default:
      return state
  }
}
