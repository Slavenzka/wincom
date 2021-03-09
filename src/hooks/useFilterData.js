import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFiltration } from 'store/actions/filtration'
import useFilterDefaults from 'hooks/useFilterDefaults'

const useFilterData = (rawData, filter = {}) => {
  const activePrimary = useSelector(store => store.filter.activePrimary)
  const activeSecondary = useSelector(store => store.filter.activeSecondary)
  const activeDate = useSelector(store => store.filter.activeDate)
  const dispatch = useDispatch()

  useFilterDefaults({
    primaryList: filter?.primary?.list,
    secondaryList: filter?.secondary?.list,
  })

  useEffect(() => {
    dispatch(applyFiltration({
      rawData: rawData,
      filter
    }))
  }, [activeSecondary, activePrimary, activeDate])
}

export default useFilterData
