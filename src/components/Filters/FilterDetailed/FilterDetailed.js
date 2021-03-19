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

  const filterObserver = []

  const renderFilterItems = () => detailedList.map((item, index) => {
    return (
      <li className={css.item} key={index}>
        <FilterDetailedItem
          observer={filterObserver}
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
