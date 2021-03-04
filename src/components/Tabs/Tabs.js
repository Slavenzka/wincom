import React from 'react'
import css from './Tabs.module.scss'
import classnames from 'classnames'

const Tabs = ({
  className,
  list,
  activeTab,
  handleClickTab,
  isDecorated,
}) => {
  if (!list || !Array.isArray(list) || list.length === 0 || !activeTab) return null

  const items = list.map((item, index) => {
    const {value, label} = item
    return (
      <li className={css.item} key={index}>
        <button
          onClick={() => handleClickTab(item)}
          className={classnames(css.trigger, {
            [css.triggerActive]: value === activeTab.value
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
        [css.listDecorated]: isDecorated
      })}
    >
      { items }
    </ul>
  )
}

export default Tabs
