import React from 'react'
import css from './Button.module.scss'
import classnames from 'classnames'
import { ButtonHeights, ButtonPalettes } from 'utils/const'
import IconSpinner from 'assets/icons/IconSpinner'

const Button = ({
  className,
  onClick,
  type = 'button',
  children,
  palette = ButtonPalettes.FILLED,
  height = ButtonHeights.REGULAR,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      className={classnames(css.button, className, {
        [css.buttonDisabled]: isLoading,
        [css.buttonFilled]: palette === ButtonPalettes.FILLED,
        [css.buttonBordered]: palette === ButtonPalettes.BORDERED,
        [css.buttonRegular]: height === ButtonHeights.REGULAR,
        [css.buttonLarge]: height === ButtonHeights.LARGE,
        [css.buttonSmall]: height === ButtonHeights.SMALL,
      })}
      type={type}
    >
      {isLoading &&
        <IconSpinner className={css.icon} />
      }
      { children }
    </button>
  )
}

export default Button
