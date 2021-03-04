import React from 'react'
import css from './Header.module.scss'
import classnames from 'classnames'
import Container from 'components/Container/Container'

const Header = ({
  className,
  style = {},
}) => {
  return (
    <header
      className={classnames(css.wrapper, className)}
      style={{...style}}
    >
      <Container>
        Header
      </Container>
    </header>
  )
}

export default Header
