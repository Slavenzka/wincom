import React from 'react'
import css from './ButtonFullImage.module.scss'
import classnames from 'classnames'

const ButtonFullImage = ({
  className,
  image,
  onClick,
  altLabel
}) => {
  return (
    <button
      onClick={onClick}
      className={classnames(css.buttonFull, className)}
      type={ `button` }
    >
      <img
        className={css.image}
        src={`data:image/jpg;base64, ${image}`}
        alt={ altLabel }
      />
    </button>

  )
}

export default ButtonFullImage
