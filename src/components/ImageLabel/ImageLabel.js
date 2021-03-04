import React from 'react'
import css from './ImageLabel.module.scss'
import classnames from 'classnames'
import { VehicleOwners } from 'utils/const'

const ImageLabel = ({
  className,
  label,
}) => {
  return (
    <p
      className={classnames(css.label, className, {
        [css.labelLight]: label === VehicleOwners.WINCOM,
        [css.labelDark]: label === VehicleOwners.PARTNER,
      })}
    >
      { label }
    </p>
  )
}
export default ImageLabel
