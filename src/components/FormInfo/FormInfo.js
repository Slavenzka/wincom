import React from 'react'
import css from './FormInfo.module.scss'
import classnames from 'classnames'

const FormInfo = ({
  className,
  list,
  auxBlock,
  label = 'Information',
}) => {
  if (!list || !Array.isArray(list) || list.length === 0) return null

  const renderItems = () => list.map(({key, value}, index) => (
    <div
      className={css.item}
      key={index}
    >
      <dt className={css.key}>
        { `${key}:` }
      </dt>
      <dd className={css.value}>
        { value }
      </dd>
    </div>
  ))

  return (
    <div className={classnames(css.wrapper, className)}>
      <span className={css.label}>
        { label }
      </span>
      <div className={css.aux}>
        { auxBlock }
      </div>
      <dl className={css.list}>
        { renderItems() }
      </dl>
    </div>
  )
}

export default FormInfo
