import React, { useMemo } from 'react'
import css from './StatusToggle.module.scss'
import classnames from 'classnames'
import IconTrust from 'assets/icons/IconTrust'
import IconNonTrust from 'assets/icons/IconNonTrust'

const StatusToggle = ({
  className,
  labelConfirm = `Confirm trusted customer status`,
  labelCancel = `Remove trusted customer status`,
  iconActive = <IconTrust className={classnames(css.icon, css.iconTrust)} />,
  iconPassive = <IconNonTrust className={css.icon} />,
  checked,
  name,
  styles = {},
  ...props
}) => {
  const renderContent = useMemo(() => checked
    ? (
      <>
        { iconActive }
        <span>
          { labelCancel }
        </span>
      </>
    )
    : (
      <>
        {iconPassive }
        <span>
          { labelConfirm }
        </span>
      </>
    ), [checked])

  return (
    <label
      htmlFor={name}
      className={classnames(css.label, className)}
      style={{...styles}}
    >
      { renderContent }
      <input
        name={name}
        id={name}
        className={ classnames(`visuallyHidden`, css.input) }
        type='checkbox'
        {...props}
      />
    </label>
  )
}

export default StatusToggle
