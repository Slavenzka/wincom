import React from 'react'
import css from './Container.module.scss'
import classnames from 'classnames'
import { ContainerPaddings } from 'utils/const'

const Container = ({
  children,
  className,
  paddings = ContainerPaddings.BOTH
}) => {
  return (
    <div
      className={classnames(className, {
        [css.wrapper]: paddings === ContainerPaddings.BOTH,
        [css.wrapperLeft]: paddings === ContainerPaddings.LEFT,
        [css.wrapperRight]: paddings === ContainerPaddings.RIGHT,
      })}
    >
      { children }
    </div>
  )
}

export default Container
