import React from 'react'
import css from './SidebarItem.module.scss'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

const SidebarItem = ({
  label,
  url,
  counter,
  tag = 'li',
  icon
}) => {
  const TagName = tag

  return (
    <TagName
      className={classnames(css.wrapper)}
    >
      <Link
        className={css.link}
        to={url}
      >
        { icon || <span className={css.iconDummy} /> }
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
