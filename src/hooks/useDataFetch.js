import { useEffect, useState } from 'react'
import axiosWincom from 'axiosWincom'
import { RequestMethods } from 'utils/const'

const useDataFetch = ({
  url,
  method = RequestMethods.GET,
  requestBody = {},
  options = {},
}) => {
  const [fetchingStatus, setFetchingStatus] = useState({
    isLoading: false,
    isLoaded: false,
    isError: false,
  })
  const [data, setData] = useState(null)
  const {adapter} = options

  const sendRequest = () => {
    switch (method) {
      case RequestMethods.POST:
        return axiosWincom[method](url, requestBody)
      default:
        return axiosWincom[method](url)
    }
  }


  useEffect(() => {
    setFetchingStatus({
      isLoading: true,
      isLoaded: false,
      isError: false,
    })

    sendRequest()
      .then(response => {
        setFetchingStatus({
          isLoading: false,
          isLoaded: true,
          isError: false,
        })

        const rawData = response?.data ? response.data : []
        const adaptedData = adapter ? adapter(rawData) : rawData
        setData(adaptedData)
      })
      .catch(error => {
        setFetchingStatus({
          isLoading: false,
          isLoaded: false,
          isError: true,
        })
        setData([])
      })
  }, [])

  return {
    data,
    fetchingStatus
  }
}

export default useDataFetch
