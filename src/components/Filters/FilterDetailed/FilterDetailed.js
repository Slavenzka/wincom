import React from 'react'
import css from './FilterDetailed.module.scss'
import classnames from 'classnames'
import FilterDetailedItem from 'components/Filters/FilterDetailedItem/FilterDetailedItem'
import IconSearch from 'assets/icons/IconSearch'

const FilterDetailed = ({
  className,
  detailedList
}) => {
  if (!detailedList || !Array.isArray(detailedList) || detailedList.length === 0) return null

  const MAX_DETAILED_FILTER_ITEMS_QTY = 6
  const filterObserver = []

  const renderFilterItems = () => detailedList.slice(0, MAX_DETAILED_FILTER_ITEMS_QTY).map((item, index) => {
    return (
      <li className={css.item} key={index}>
        <FilterDetailedItem
          observer={filterObserver}
          detailedList={detailedList}
          {...item}
        />
      </li>
    )
  })

  return (
    <div className={css.wrapper}>
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
