import React from 'react'
import { LocalStorageAuthFields } from 'utils/const'
import { setAuthStatus, toggleModal } from 'store/actions'
import ModalMessage from 'components/Modal/ModalMessage/ModalMessage'
import { useDispatch } from 'react-redux'
import { checkUnauthorizedStatus } from 'utils/fetching'
import { LOGIN } from 'Pages/Routes'

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
            descriptor={ `User credentials are non-valid or have been expired. Please, log in again to proceed with the application.` }
            buttonLabel={ `Go to login page` }
            buttonClickHandler={() => {
              dispatch(setAuthStatus(false))
              localStorage.removeItem(LocalStorageAuthFields.TOKEN)
              props.history.replace({
                pathname: LOGIN
              })
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
