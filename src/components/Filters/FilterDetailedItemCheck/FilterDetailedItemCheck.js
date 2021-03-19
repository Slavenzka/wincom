import React from 'react'
import css from './FilterDetailedItemCheck.module.scss'
import classnames from 'classnames'
import IconCheck from 'assets/icons/IconCheck'

const FilterDetailedItemCheck = ({
  isChecked,
  onChange,
  id,
  label,
}) => {
  return (
    <div className={css.wrapper}>
      <label
        className={classnames(css.label, {
          [css.labelChecked]: isChecked
        })}
        htmlFor={id}
      >
        {isChecked &&
          <IconCheck className={css.icon} />
        }
        <span>
          { label }
        </span>
      </label>
      <input
        className={ `visuallyHidden` }
        onChange={onChange}
        checked={isChecked}
        id={id}
        name={id}
        type='checkbox'
      />
    </div>
  )
}

export default FilterDetailedItemCheck
