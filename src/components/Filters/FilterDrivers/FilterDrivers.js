import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_DRIVERS } from 'utils/data'
import Filters from 'components/Filters/Filters'
import { setDriversFilterValue } from 'store/actions'

const FilterDrivers = () => {
  const driversList = FILTER_DRIVERS
  const activeDrivers = useSelector(store => store.filter.activeDrivers)
  const dispatch = useDispatch()

  const handleClickDrivers = evt => dispatch(setDriversFilterValue(evt))

  return (
    <Filters
      primaryList={driversList}
      activePrimary={activeDrivers}
      handleClickPrimary={handleClickDrivers}
    />
  )
}

export default FilterDrivers
