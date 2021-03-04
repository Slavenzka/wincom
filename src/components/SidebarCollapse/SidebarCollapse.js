import React from 'react'
import css from './SidebarCollapse.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import IconArrowSidebar from 'assets/icons/IconArrowSidebar'
import { useSelector } from 'react-redux'

const SidebarCollapse = ({onClick, className}) => {
  const isSidebarCollapsed = useSelector(store => store.ui.isSidebarCollapsed)
  const label = isSidebarCollapsed ? '' : 'Close'

  return (
    <Button
      className={classnames(css.button, className)}
      onClick={onClick}
    >
      <IconArrowSidebar className={css.icon} />
      { label }
    </Button>
  )
}

export default SidebarCollapse
