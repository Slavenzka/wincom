import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// a hook to get data from redux store after it was reset in useFilterData hook
const useActualPageData = () => {
  const [isMounted, setMountedStatus] = useState(false)
  const filteredData = useSelector(store => store.filter.filteredData)

  useEffect(() => {
    if (filteredData && !isMounted) {
      setMountedStatus(true)
    }
  }, [filteredData, isMounted])

  return isMounted ? filteredData : null
}

export default useActualPageData
