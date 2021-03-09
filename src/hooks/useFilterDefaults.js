import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { resetFilters } from 'store/actions'

const useFilterDefaults = ({primaryList = [], secondaryList = []}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetFilters({primaryList, secondaryList}))

    return () => {
      dispatch(resetFilters({primaryList, secondaryList}))
    }
  }, [dispatch])
}

export default useFilterDefaults
