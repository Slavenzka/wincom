import React from 'react'
import css from './ImageViewer.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'

const ImageViewer = ({
  className,
  imageArray,
}) => {
  const dispatch = useDispatch()

  const handleClickImage = image => dispatch(toggleModal((
    <img className={css.full} src={image} alt={ `Vehicle` } />
  )))

  const renderImages = () => imageArray.map((image, index) => (
    <li
      className={classnames(css.item, {
        [css.itemLarge]: index === 0
      })}
      key={index}
    >
      <button
        className={css.trigger}
        onClick={() => handleClickImage(image)}
        type='button'
      >
        <img
          src={image}
          className={css.preview}
          alt={ `Vehicle preview` }
        />
      </button>
    </li>
  ))

  return (
    <ul className={classnames(css.wrapper, className)}>
      { renderImages() }
    </ul>
  )
}

export default ImageViewer
