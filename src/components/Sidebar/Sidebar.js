import React from 'react'
import css from './Sidebar.module.scss'
import SidebarItem from 'components/SidebarItem/SidebarItem'
import SidebarCollapse from 'components/SidebarCollapse/SidebarCollapse'
import { SIDEBAR_LIST } from 'Pages/Routes'

const Sidebar = ({handleClickCollapse, style}) => {
  const data = SIDEBAR_LIST

  const list = data.map((item, index) => (
    <React.Fragment key={index}>
      <SidebarItem {...item} />
    </React.Fragment>
  ))

  return (
    <aside className={css.wrapper} style={{...style}}>
      <ul className={css.list}>
        { list }
      </ul>
      <SidebarCollapse className={css.button} onClick={handleClickCollapse} />
    </aside>
  )
}

export default Sidebar
