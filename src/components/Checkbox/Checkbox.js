import React from 'react'
import css from './Checkbox.module.scss'
import classnames from 'classnames'

const Checkbox = ({
  className,
  name,
  checked,
  label,
  ...props
}) => {
  const itemID = `checkbox - ${name}`

  return (
    <span className={classnames(css.wrapper, className)}>
      <label
        className={classnames(css.label, {
          [css.labelChecked]: checked,
          [css.labelContent]: !!label
        })}
        htmlFor={itemID}
      >
        { label }
        <input
          className={'visuallyHidden'}
          type='checkbox'
          id={itemID}
          checked={checked}
          {...props}
        />
      </label>
    </span>
  )
}

export default Checkbox
