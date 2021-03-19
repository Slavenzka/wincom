import React from 'react'
import classnames from 'classnames'
import css from './DesktopApp.module.scss'
import Routes, { LOGIN, REGISTER } from 'Pages/Routes'
import SiteGrid from 'components/SiteGrid/SiteGrid'
import Sidebar from 'components/Sidebar/Sidebar'
import Header from 'components/Header/Header'
import Login from 'Pages/Login/Login'
import { Route, Redirect, withRouter } from 'react-router-dom'
import useAuthCheck from 'hooks/useAuthCheck'
import { useSelector } from 'react-redux'
import { withRequestHandler } from 'hoc/withRequestHandler'
import axiosWincom from 'axiosWincom'

const DesktopApp = ({history}) => {
  const isAuthorized = useAuthCheck(history)
  const isModalOpen = !!useSelector(store => store.ui.modal.content)
  console.log(`isAuthorized: ${isAuthorized}`)

  const renderContent = () => isAuthorized
    ? (
      <SiteGrid
        className={classnames({
          [css.wrapperBlured]: isModalOpen
        })}
      >
        {handleClickCollapse => (
          <>
            <div
              className={css.wrapperHeader}
            >
              <Header />
            </div>
            <Sidebar
              className={css.sidebar}
              classNameCollapsed={css.sidebarCollapsed}
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
    : (
      <div
        className={classnames({
          [css.wrapperBlured]: isModalOpen
        })}
      >
        <Route exact path={REGISTER} render={() => <Login isRegistration />} />
        <Route exact path={LOGIN} component={Login} />
        <Redirect
          to={{
            pathname: LOGIN
          }}
        />
      </div>
    )

  return renderContent()
}

export default withRouter(withRequestHandler(DesktopApp, axiosWincom))
