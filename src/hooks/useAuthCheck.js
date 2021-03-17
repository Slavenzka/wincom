import { useEffect, useState } from 'react'
import { LocalStorageAuthFields } from 'utils/const'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE, LOGIN } from 'Pages/Routes'
import { useSelector } from 'react-redux'

const useAuthCheck = () => {
  const [isAuthorized, setAuthStatus] = useState(false)
  const storeAuthStatus = useSelector(store => store.auth.isAuthorized)
  const history = useHistory()

  useEffect(() => {
    const existingToken = localStorage.getItem(LocalStorageAuthFields.TOKEN)
    console.log(storeAuthStatus)
    console.log(existingToken)

    if (existingToken && storeAuthStatus) {
      setAuthStatus(true)
      history.push({
        pathname: HOME_PAGE
      })
    }

    if (existingToken && !storeAuthStatus) {
      setAuthStatus(false)
      localStorage.removeItem(LocalStorageAuthFields.TOKEN)
      history.push({
        pathname: LOGIN
      })
    }
  }, [storeAuthStatus])

  return isAuthorized
}

export default useAuthCheck
