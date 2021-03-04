import React from 'react'
import css from './Checkbox.module.scss'
import classnames from 'classnames'

const Checkbox = ({
  className,
  name,
  checked,
  register = () => {},
  ...props
}) => {
  const itemID = `checkbox - ${name}`

  return (
    <span className={classnames(css.wrapper, className)}>
      <label
        className={classnames(css.label, {
          [css.labelChecked]: checked
        })}
        htmlFor={itemID}
      >
        <input
          className={'visuallyHidden'}
          type='checkbox'
          id={itemID}
          checked={checked}
          ref={register}
          {...props}
        />
      </label>
    </span>
  )
}

export default Checkbox
