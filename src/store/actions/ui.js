import {
  TOGGLE_SIDEBAR_COLLAPSE,
  TOGGLE_MODAL
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

export const toggleSidebarCollapse = newStatus => ({
  type: TOGGLE_SIDEBAR_COLLAPSE,
  payload: newStatus
})
