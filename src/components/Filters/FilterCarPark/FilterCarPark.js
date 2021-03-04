import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryFilterValue } from 'store/actions'
import Filters from 'components/Filters/Filters'
import { FILTER_CATEGORY } from 'utils/data'

const FilterCarPark = () => {
  const categoryList = FILTER_CATEGORY
  const activeCategory = useSelector(store => store.filter.activeCategory)
  const dispatch = useDispatch()

  const handleClickCategory = evt => dispatch(setCategoryFilterValue(evt))

  return (
    <Filters
      secondaryList={categoryList}
      activeSecondary={activeCategory}
      handleClickSecondary={handleClickCategory}
  />
  )
}

export default FilterCarPark
