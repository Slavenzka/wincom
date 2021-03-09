import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// a hook to get data from redux store after it was reset in useFilterData hook
const useActualPageData = () => {
  const isMounted = useRef(false)
  const filteredData = useSelector(store => store.filter.filteredData)


  useEffect(() => {
    isMounted.current = true
  })

  return isMounted.current ? filteredData : null
}

export default useActualPageData
