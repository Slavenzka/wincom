import React from 'react'
import css from './SidebarItem.module.scss'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const SidebarItem = ({
  label,
  url,
  counter,
  tag = 'li',
  icon,
  isCollapsed,
}) => {
  const TagName = tag

  return (
    <TagName
      className={classnames(css.wrapper, {
        [css.wrapperCollapsed]: isCollapsed
      })}
    >
      <Link
        className={css.link}
        to={url}
      >
        <span className={css.icon}>
          { icon || <span className={css.iconDummy} /> }
        </span>
        <span className={css.label}>
          { label }
        </span>
        {counter &&
          <span className={css.counter}>
            {counter}
          </span>
        }
      </Link>
    </TagName>
  )
}

export default SidebarItem
