import React from 'react'
import css from './NoDataMessage.module.scss'
import classnames from 'classnames'

const NoDataMessage = ({
  className,
  label = 'No data available.',
}) => {
  return (
    <p className={classnames(css.empty, className)}>
      { label }
    </p>
  )
}

export default NoDataMessage
