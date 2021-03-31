import React from 'react'
import css from './SiteGrid.module.scss'
import classnames from 'classnames'
import useToggleSidebar from 'hooks/useToggleSidebar'

const SiteGrid = ({children, className}) => {
  const {isSidebarCollapsed, isUncollapsed, handleClickCollapseButton} = useToggleSidebar()

  return (
    <div className={classnames(css.wrapper, className, {
      [css.wrapperCollapsed]: isSidebarCollapsed,
      [css.wrapperUncollapsed]: isUncollapsed || !isSidebarCollapsed,
    })}>
      { children(handleClickCollapseButton) }
    </div>
  )
}

export default SiteGrid
