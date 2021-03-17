import React from 'react'
import css from './Header.module.scss'
import classnames from 'classnames'
import Container from 'components/Container/Container'
import { useDispatch } from 'react-redux'
import { setAuthStatus } from 'store/actions'

const Header = ({
  className,
  style = {},
}) => {
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(setAuthStatus(false))
  }

  return (
    <header
      className={classnames(css.wrapper, className)}
      style={{...style}}
    >
      <Container>
        Header
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

export default Header
