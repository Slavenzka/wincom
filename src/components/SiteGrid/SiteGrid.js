import React from 'react'
import css from './SiteGrid.module.scss'
import classnames from 'classnames'
import useToggleSidebar from 'hooks/useToggleSidebar'

const SiteGrid = ({children}) => {
  const {isSidebarCollapsed, isUncollapsed, handleClickCollapseButton} = useToggleSidebar()

  return (
    <div className={classnames(css.wrapper, {
      [css.wrapperCollapsed]: isSidebarCollapsed,
      [css.wrapperUncollapsed]: isUncollapsed,
    })}>
      { children(handleClickCollapseButton) }
    </div>
  )
}

export default SiteGrid
