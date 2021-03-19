import {
  TOGGLE_SIDEBAR_COLLAPSE,
  TOGGLE_MODAL, TOGGLE_MODAL_LOADING_STATE
} from 'store/actions/actionTypes'

export const toggleModal = (content, options) => {
  return {
    type: TOGGLE_MODAL,
    payload: {
      content,
      options
    }
  }
}

export const toggleModalLoadingState = status => ({
  type: TOGGLE_MODAL_LOADING_STATE,
  payload: status
})

export const toggleSidebarCollapse = newStatus => ({
  type: TOGGLE_SIDEBAR_COLLAPSE,
  payload: newStatus
})
