import React from 'react'
import css from './FilterDetailed.module.scss'
import classnames from 'classnames'
import FilterDetailedItem from 'components/Filters/FilterDetailedItem/FilterDetailedItem'

const FilterDetailed = ({
  className,
  detailedList
}) => {
  if (!detailedList || !Array.isArray(detailedList) || detailedList.length === 0) return null

  const renderFilterItems = () => detailedList.map((item, index) => {
    return (
      <li className={css.item} key={index}>
        <FilterDetailedItem {...item} />
      </li>
    )
  })

  return (
    <ul
      className={classnames(css.list, className)}
      style={{
        gridTemplateColumns: `repeat(${detailedList.length}, 1fr)`
      }}
    >
      { renderFilterItems() }
    </ul>
  )
}

export default FilterDetailed
