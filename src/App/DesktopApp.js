import React from 'react'
import classnames from 'classnames'
import css from './DesktopApp.module.scss'
import Routes, { LOGIN, REGISTER } from 'Pages/Routes'
import SiteGrid from 'components/SiteGrid/SiteGrid'
import Sidebar from 'components/Sidebar/Sidebar'
import Header from 'components/Header/Header'
import Login from 'Pages/Login/Login'
import { Route, Redirect } from 'react-router-dom'
import useAuthCheck from 'hooks/useAuthCheck'
import { useSelector } from 'react-redux'

const DesktopApp = () => {
  const isAuthorized = useAuthCheck()
  const isModalOpen = !!useSelector(store => store.ui.modal.content)
  console.log(isAuthorized)

  return isAuthorized
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
        <Route exact path={LOGIN} render={() => <Login />} />
        <Redirect
          to={{
            pathname: LOGIN
          }}
        />
      </div>
    )
}

export default DesktopApp
