import React from 'react'
import css from './Header.module.scss'
import classnames from 'classnames'
import Container from 'components/Container/Container'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from 'store/actions'
import { useHistory, withRouter } from 'react-router-dom'
import { LOGIN } from 'Pages/Routes'
import { LocalStorageAuthFields } from 'utils/const'

const Header = ({
  className,
  style = {},
}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClickLogout = () => {
    dispatch(setAuthStatus(false))
    localStorage.removeItem(LocalStorageAuthFields.TOKEN)
    history.push({
      pathname: LOGIN
    })
  }

  return (
    <header
      className={classnames(css.wrapper, className)}
      style={{...style}}
    >
      <Container className={css.container}>
        <span>
          Header
        </span>
        <button
          onClick={handleClickLogout}
          className={css.button}
          type={ `button` }
        >
          Log out
        </button>
      </Container>
    </header>
  )
}

export default withRouter(Header)
