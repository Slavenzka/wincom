import React from 'react'
import css from './Input.module.scss'
import classnames from 'classnames'

const Input = ({
  className,
  label,
  name,
  placeholder = 'Enter your value',
  isDisabled,
  children,
  isDetailedFilerStyle,
  isAuthStyle,
  isModalStyle,
  isCash,
  isError,
  ...props
}) => {
  return (
    <div className={classnames(css.wrapper, className, {
      [css.wrapperCash]: isCash
    })}>
      { children }
      {label &&
        <label
          className={css.label}
          htmlFor={name}
        >
          { label }
        </label>
      }
      <input
        className={classnames(css.input, {
          [css.inputError]: isError,
          [css.inputDisabled]: isDisabled,
          [css.inputCash]: isCash,
          [css.inputDetailed]: isDetailedFilerStyle,
          [css.inputAuth]: isAuthStyle,
          [css.inputModal]: isModalStyle,
        })}
        id={name}
        name={name}
        placeholder={placeholder}
        type='text'
        {...props}
      />
    </div>
  )
}

export default Input
