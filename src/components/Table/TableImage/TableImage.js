import React from 'react'
import css from './TableImage.module.scss'
import classnames from 'classnames'
import ImageLabel from 'components/ImageLabel/ImageLabel'

const TableImage = ({
  className,
  url,
  label,
  altLabel = 'Vehicle image',
  isHovered,
}) => {
  return (
    <div
      className={classnames(css.wrapper, {
        [css.wrapperHovered]: isHovered
      })}
    >
      {label &&
        <ImageLabel
          className={css.label}
          label={label}
        />
      }
      <img
        className={classnames(css.image, className)}
        src={url}
        alt={altLabel}
      />
    </div>
  )
}

export default TableImage
