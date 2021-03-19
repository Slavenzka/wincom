import React from 'react'
import css from './SidebarCollapse.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import IconArrowSidebar from 'assets/icons/IconArrowSidebar'

const SidebarCollapse = ({onClick, className, isCollapsed}) => {
  const label = 'Collapse'

  return (
    <Button
      className={classnames(css.button, className, {
        [css.buttonCollapsed]: isCollapsed,
      })}
      onClick={onClick}
    >
      <IconArrowSidebar className={css.icon} />
      <span className={css.label}>
        { label }
      </span>
    </Button>
  )
}

export default SidebarCollapse
