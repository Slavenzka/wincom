import {useEffect} from 'react'
import { FILTER_OWNERS } from 'utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilters, setOwnerFilterValue } from 'store/actions'

const useFilterDefaults = () => {
  const dispatch = useDispatch()
  const ownersList = FILTER_OWNERS
  const activeOwner = useSelector(store => store.filter.activeOwner)
  const handleClickOwner = evt => dispatch(setOwnerFilterValue(evt))

  useEffect(() => {
    dispatch(resetFilters())

    return () => {
      dispatch(resetFilters())
    }
  }, [dispatch])

  return {
    list: ownersList,
    activeItem: activeOwner,
    handleClickItem: handleClickOwner
  }
}

export default useFilterDefaults
