import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStatusFilterValue } from 'store/actions'
import Filters from 'components/Filters/Filters'
import { FILTER_DELIVERY_STATUS } from 'utils/data'

const FilterOrders = () => {
  const statusList = FILTER_DELIVERY_STATUS
  const activeStatus = useSelector(store => store.filter.activeStatus)
  const dispatch = useDispatch()

  const handleClickStatus = evt => dispatch(setStatusFilterValue(evt))

  return (
    <Filters
      secondaryList={statusList}
      activeSecondary={activeStatus}
      handleClickSecondary={handleClickStatus}
  />
  )
}

export default FilterOrders
