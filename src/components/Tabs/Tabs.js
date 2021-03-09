import React from 'react'
import css from './Tabs.module.scss'
import classnames from 'classnames'

const Tabs = ({
  className,
  list,
  activeTab,
  handleClickTab,
  isPrimary,
}) => {
  if (!list || !Array.isArray(list) || list.length === 0 || !activeTab) return null

  const items = list.map((item, index) => {
    const {values, label} = item

    return (
      <li className={css.item} key={index}>
        <button
          onClick={() => handleClickTab(item)}
          className={classnames(css.trigger, {
            [css.triggerActive]: values === activeTab.values
          })}
        >
          { label }
        </button>
      </li>
    )
  })

  return (
    <ul
      className={classnames(css.list, className, {
        [css.listDecorated]: isPrimary
      })}
    >
      { items }
    </ul>
  )
}

export default Tabs
