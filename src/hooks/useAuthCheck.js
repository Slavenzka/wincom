import { useEffect, useState } from 'react'
import { LocalStorageAuthFields } from 'utils/const'
import { LOGIN } from 'Pages/Routes'
import { useSelector } from 'react-redux'

const useAuthCheck = (history) => {
  const storeAuthStatus = useSelector(store => store.auth.isAuthorized)
  const existingToken = localStorage.getItem(LocalStorageAuthFields.TOKEN)
  const [isAuthorized, setAuthStatus] = useState(!!existingToken)

  useEffect(() => {
    if (existingToken) {
      setAuthStatus(true)
    }
  }, [existingToken])

  useEffect(() => {
    if (!existingToken && !storeAuthStatus && isAuthorized) {
      setAuthStatus(false)
      history.push({
        pathname: LOGIN
      })
    }
  }, [history, existingToken, storeAuthStatus, isAuthorized])

  return isAuthorized
}

export default useAuthCheck
