import React from 'react'
import css from './Button.module.scss'
import classnames from 'classnames'
import { ButtonHeights, ButtonPalettes } from 'utils/const'

const Button = ({
  className,
  onClick,
  type = 'button',
  children,
  palette = ButtonPalettes.FILLED,
  height = ButtonHeights.REGULAR,
}) => {
  return (
    <button
      onClick={onClick}
      className={classnames(css.button, className, {
        [css.buttonFilled]: palette === ButtonPalettes.FILLED,
        [css.buttonBordered]: palette === ButtonPalettes.BORDERED,
        [css.buttonRegular]: height === ButtonHeights.REGULAR,
        [css.buttonLarge]: height === ButtonHeights.LARGE,
      })}
      type={type}
    >
      { children }
    </button>
  )
}

export default Button
