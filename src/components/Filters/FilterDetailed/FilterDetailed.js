import React, { useCallback, useState } from 'react'
import css from './FilterDetailed.module.scss'
import classnames from 'classnames'
import FilterDetailedItem from 'components/Filters/FilterDetailedItem/FilterDetailedItem'
import IconSearch from 'assets/icons/IconSearch'
import { checkIfDetailedListTouched } from 'utils'
import { resetFilters } from 'store/actions'
import { useDispatch } from 'react-redux'
import { DetailedFilterTypes } from 'utils/const'

const getAllRangeFields = filter => {
  return filter.reduce((total, {field, type}) => {
    if (type === DetailedFilterTypes.RANGE) {
      total[field] = false
    }

    return total
  }, {})
}

const FilterDetailed = ({
  className,
  defaultList,
  detailedList,
}) => {
  const dispatch = useDispatch()
  const [isRangeTouched, setRangeTouchedStatus] = useState(getAllRangeFields(defaultList))
  const filterObserver = []

  const handleTouchRange = useCallback((newStatus, field) => {
    setRangeTouchedStatus(prevState => {
      const stateCopy = JSON.parse(JSON.stringify(prevState))
      stateCopy[field] = newStatus
      return stateCopy
    })
  }, [])

  const handleResetFilterDetailed = useCallback(() => {
    dispatch(resetFilters({detailedList: defaultList}))
    Object.keys(isRangeTouched).forEach(key => {
      isRangeTouched[key] = false
    })

    filterObserver.forEach(fn => fn())
  }, [defaultList, dispatch, filterObserver, isRangeTouched])

  if (!detailedList || !Array.isArray(detailedList) || detailedList.length === 0) return null

  const isDetailedListTouched = checkIfDetailedListTouched(detailedList) || Object.values(isRangeTouched).filter(item => !!item).length > 0
  const MAX_DETAILED_FILTER_ITEMS_QTY = 6

  const renderFilterItems = () => detailedList.slice(0, MAX_DETAILED_FILTER_ITEMS_QTY).map((item, index) => {
    return (
      <li className={css.item} key={index}>
        <FilterDetailedItem
          observer={filterObserver}
          detailedList={detailedList}
          handleTouchRange={handleTouchRange}
          isRangeTouched={isRangeTouched?.[item?.field]}
          {...item}
        />
      </li>
    )
  })

  return (
    <div className={css.wrapper}>
      <button
        className={classnames(css.buttonClear, {
          [css.buttonClearVisible]: isDetailedListTouched
        })}
        onClick={handleResetFilterDetailed}
        type={ `button` }
      >
        Clear all
      </button>
      <span className={css.label}>
        Search by
        <IconSearch className={css.icon} />
      </span>
      <ul className={classnames(css.list, className)}>
        { renderFilterItems() }
      </ul>
    </div>
  )
}

export default FilterDetailed
