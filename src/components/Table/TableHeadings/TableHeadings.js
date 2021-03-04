import React from 'react'
import css from './TableHeadings.module.scss'
import classnames from 'classnames'

const TableHeadings = ({
  list,
  columnsClass,
  setRef
}) => {
  if (!list || !Array.isArray(list) || list.length === 0) return null

  return (
    <ul className={classnames(css.list, columnsClass)} ref={setRef}>
      {list.map(({label},index) => (
        <li className={css.item} key={index}>
          { label }
        </li>
      ))}
    </ul>
  )
}

export default TableHeadings
