import React from 'react'
import css from './Preloader.module.scss'
import classnames from 'classnames'
import IconSpinner from 'assets/icons/IconSpinner'

const Preloader = ({className}) => {
  return (
    <div className={classnames(css.wrapper, className)}>
      <IconSpinner className={css.icon} />
    </div>
  )
}

export default Preloader
