import React from 'react'
import css from './DesktopApp.module.scss'
import Routes from 'Pages/Routes'
import SiteGrid from 'components/SiteGrid/SiteGrid'
import Sidebar from 'components/Sidebar/Sidebar'
import useElementHeight from 'hooks/useElementHeight'
import Header from 'components/Header/Header'

const DesktopApp = () => {
  const [elHeight, elRef] = useElementHeight()

  return (
    <SiteGrid>
      {handleClickCollapse => (
        <>
          <div
            className={css.wrapperHeader}
            ref={elRef}
          >
            <Header />
          </div>
          <Sidebar
            handleClickCollapse={handleClickCollapse}
            style={{
              minHeight: `calc(100vh - ${elHeight}px)`,
              top: `${elHeight}px`
            }}
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
