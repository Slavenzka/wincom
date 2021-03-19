import React, { useEffect, useState, useRef, useCallback } from 'react'
import axiosWincom from 'axiosWincom'
import { RequestMethods } from 'utils/const'
import { checkUnauthorizedStatus } from 'utils/fetching'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalMessage from 'components/Modal/ModalMessage/ModalMessage'

const useDataFetch = ({
  url,
  method = RequestMethods.GET,
  requestBody,
  options = {},
}) => {
  const [fetchingStatus, setFetchingStatus] = useState({
    isLoading: false,
    isLoaded: false,
    isError: false,
  })
  const [data, setData] = useState(null)
  const isMounted = useRef(true)
  const dispatch = useDispatch()
  const {adapter} = options

  const fetchData = useCallback(() => {
    const sendRequest = (url, method, requestBody) => {
      switch (method) {
        case RequestMethods.POST:
          return axiosWincom[method](url, requestBody || {})
        default:
          return axiosWincom[method](url)
      }
    }

    if (url) {
      setFetchingStatus({
        isLoading: true,
        isLoaded: false,
        isError: false,
      })

      new Promise(resolve => resolve(sendRequest(url, method, requestBody)))
        .then(response => {
          if (isMounted.current) {
            setFetchingStatus({
              isLoading: false,
              isLoaded: true,
              isError: false,
            })

            const rawData = response?.data ? response.data : []
            const adaptedData = adapter ? adapter(rawData) : rawData
            console.log(adaptedData)
            setData(adaptedData)
          }
        })
        .catch(error => {
          if (isMounted.current) {
            const isUnauthorized = checkUnauthorizedStatus(error)

            setFetchingStatus({
              isLoading: false,
              isLoaded: false,
              isError: true,
            })
            setData([])

            if (!isUnauthorized) {
              const errorMessage = error?.response?.data?.message

              dispatch(toggleModal((
                <ModalMessage
                  title={ `Error while fetching data` }
                  descriptor={ `Something went wrong while fetching data from the server.` }
                  error={errorMessage}
                />
              )))
            }
          }
        })
    }
  }, [adapter, dispatch, url, method, requestBody])


  useEffect(() => {
    fetchData()

    return () => {
      isMounted.current = false
    }
  }, [fetchData])

  return {
    data,
    fetchingStatus
  }
}

export default useDataFetch
