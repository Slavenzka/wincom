import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { resetFilters } from 'store/actions'

const useFilterDefaults = ({primaryList, secondaryList, detailedList}) => {
  const isMounted = useRef(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isMounted.current) {
      dispatch(resetFilters({primaryList, secondaryList, detailedList}))
      isMounted.current = true
    }
  }, [dispatch, primaryList, secondaryList, detailedList])

  useEffect(() => {
    return () => {
      dispatch(resetFilters({primaryList: null, secondaryList: null, detailedList: null}))
      isMounted.current = false
    }
  }, [dispatch])
}

export default useFilterDefaults
