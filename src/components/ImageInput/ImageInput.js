import React from 'react'
import css from './ImageInput.module.scss'
import classnames from 'classnames'
import { ACCEPTED_IMAGE_FORMATS } from 'utils/const'

const ImageInput = ({
  className,
  register,
  images,
  label = 'Upload a file',
  name,
}) => {
  const formats = ACCEPTED_IMAGE_FORMATS.join(', ')

  return (
    <div className={classnames(css.wrapper, className)}>
      <label
        className={css.label}
        htmlFor={name}
      >
        { label }
      </label>
      <input
        name={name}
        className={'visuallyHidden'}
        type='file'
        id={name}
        ref={register}
        accept={formats}
      />
    </div>
  )
}

export default ImageInput
