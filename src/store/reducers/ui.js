import {
  TOGGLE_MODAL, TOGGLE_SIDEBAR_COLLAPSE
} from 'store/actions/actionTypes'
import { updateObject } from 'utils'

const initialState = {
  isSidebarCollapsed: false,
  modal: {
    content: null,
    options: {}
  },
}

export function uiReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return updateObject(state, { modal: {
        content: action.payload.content,
        options: action.payload.options
      }})
    case TOGGLE_SIDEBAR_COLLAPSE:
      return updateObject(state, {
        isSidebarCollapsed: action.payload
      })
    default: return state
  }
}
