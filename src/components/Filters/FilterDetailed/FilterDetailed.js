import React from 'react'
import css from './FilterDetailed.module.scss'
import classnames from 'classnames'

const FilterDetailed = ({
  className,
  detailedList
}) => {
  if (!detailedList || !Array.isArray(detailedList) || detailedList.length === 0) return null

  const renderFilterItems = () => detailedList.map(({label, type}, index) => {
    return (
      <li className={css.item} key={index}>
        { label }
      </li>
    )
  })

  return (
    <ul className={classnames(css.list, className)}>
      { renderFilterItems() }
    </ul>
  )
}

export default FilterDetailed
