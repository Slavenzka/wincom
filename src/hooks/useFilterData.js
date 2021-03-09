import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFilterDefaults from 'hooks/useFilterDefaults'
import { applyFiltration } from 'store/actions'

const useFilterData = (rawData, filter = {}) => {
  const activePrimary = useSelector(store => store.filter.activePrimary)
  const activeSecondary = useSelector(store => store.filter.activeSecondary)
  const activeDate = useSelector(store => store.filter.activeDate)
  const detailedFilter = useSelector(store => store.filter.detailedFilter)
  const dispatch = useDispatch()

  useFilterDefaults({
    primaryList: filter?.primary?.list,
    secondaryList: filter?.secondary?.list,
    detailedList: filter?.detailed
  })

  useEffect(() => {
    dispatch(applyFiltration({
      rawData: rawData,
      filter
    }))
  }, [activeSecondary, activePrimary, activeDate, detailedFilter])
}

export default useFilterData
