import React from 'react'
import css from './ContentHeader.module.scss'
import classnames from 'classnames'
import Heading from 'components/Heading/Heading'
import { Link } from 'react-router-dom'
import IconArrowSidebar from 'assets/icons/IconArrowSidebar'

const ContentHeader = ({
  className,
  title,
  controls,
  children,
  backlink,
}) => {
  return (
    <div className={classnames(css.wrapper, className)}>
      {backlink &&
        <Link
          className={css.back}
          to={backlink}
        >
          <IconArrowSidebar className={css.icon} />
          back
        </Link>
      }
      <Heading
        className={css.heading}
        label={title}
      />
      {controls &&
        <div className={css.controls}>
          { controls }
        </div>
      }
      <div className={css.content}>
        { children }
      </div>
    </div>
  )
}

export default React.memo(ContentHeader)
