import React from 'react'
import css from './Sidebar.module.scss'
import classnames from 'classnames'
import SidebarItem from 'components/SidebarItem/SidebarItem'
import SidebarCollapse from 'components/SidebarCollapse/SidebarCollapse'
import { SIDEBAR_LIST } from 'Pages/Routes'
import { useSelector } from 'react-redux'

const Sidebar = ({className, classNameCollapsed, handleClickCollapse, style}) => {
  const isSidebarCollapsed = useSelector(store => store.ui.isSidebarCollapsed)

  const list = SIDEBAR_LIST.map((item, index) => (
    <React.Fragment key={index}>
      <SidebarItem
        isCollapsed={isSidebarCollapsed}
        {...item}
      />
    </React.Fragment>
  ))

  return (
    <aside
      className={classnames(css.wrapper, className, {
        [classNameCollapsed]: isSidebarCollapsed
      })}
      style={{...style}}
    >
      <ul className={css.list}>
        { list }
      </ul>
      <SidebarCollapse
        className={css.button}
        onClick={handleClickCollapse}
        isCollapsed={isSidebarCollapsed}
      />
    </aside>
  )
}

export default Sidebar
