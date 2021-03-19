import {
  TOGGLE_MODAL, TOGGLE_MODAL_LOADING_STATE, TOGGLE_SIDEBAR_COLLAPSE
} from 'store/actions/actionTypes'
import { updateObject } from 'utils'

const initialState = {
  isSidebarCollapsed: false,
  modal: {
    content: null,
    options: {
      isLoading: false
    },
  },
}

export function uiReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return updateObject(state, { modal: {
        content: action.payload.content,
        options: action.payload.options
      }})
    case TOGGLE_MODAL_LOADING_STATE:
      const optionsCopy = updateObject(state.modal.options, {isLoading: action.payload})
      const modalCopy = updateObject(state.modal, {options: optionsCopy})
      return updateObject(state, {modal: modalCopy})
    case TOGGLE_SIDEBAR_COLLAPSE:
      return updateObject(state, {
        isSidebarCollapsed: action.payload
      })
    default: return state
  }
}
