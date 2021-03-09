import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { resetFilters } from 'store/actions'

const useFilterDefaults = ({primaryList = [], secondaryList = [], detailedList = []}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetFilters({primaryList, secondaryList, detailedList}))
  }, [dispatch])
}

export default useFilterDefaults
