import React from 'react'
import css from './DesktopApp.module.scss'
import Routes from 'Pages/Routes'
import SiteGrid from 'components/SiteGrid/SiteGrid'
import Sidebar from 'components/Sidebar/Sidebar'
import Header from 'components/Header/Header'

const DesktopApp = () => {

  return (
    <SiteGrid>
      {handleClickCollapse => (
        <>
          <div
            className={css.wrapperHeader}
          >
            <Header />
          </div>
          <Sidebar
            className={css.sidebar}
            handleClickCollapse={handleClickCollapse}
          />
          <main className={css.main}>
            <div className={css.wrapperContent}>
              <Routes />
            </div>
          </main>
        </>
      )}
    </SiteGrid>
  )
}

export default DesktopApp
