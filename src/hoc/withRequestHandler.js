import React from 'react'
import { LocalStorageAuthFields } from 'utils/const'
import { toggleModal } from 'store/actions'
import ModalMessage from 'components/Modal/ModalMessage/ModalMessage'
import { useDispatch } from 'react-redux'
import { checkUnauthorizedStatus } from 'utils/fetching'

const REQUEST_TIMEOUT_TIME = 10 * 60 * 1000

export const withRequestHandler = (WrappedComponent, axios) => {
  return props => {
    const dispatch = useDispatch()

    axios.interceptors.request.use(request => {
      const token = localStorage.getItem(LocalStorageAuthFields.TOKEN)

      request.headers.Authorization = `Bearer ${token}`
      request.timeout = REQUEST_TIMEOUT_TIME

      return request
    })

    axios.interceptors.response.use(response => {
      return response
    }, error => {
      const isUnauthorized = checkUnauthorizedStatus(error)

      if (isUnauthorized) {
        dispatch(toggleModal(
          <ModalMessage
            title={ `Wrong user authentication` }
            descriptor={ `To proceed with data request, please, log out, then check your login/password and try to log in again. Otherwise proceed to user registration.` }
            buttonLabel={ `Go back` }
            buttonClickHandler={() => {
              dispatch(toggleModal(null))
            }}
          />
        ))
      }

      return Promise.reject(error)
    })

    return <WrappedComponent {...props} />
  }
}
