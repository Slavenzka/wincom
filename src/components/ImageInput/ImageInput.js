import React, { useState } from 'react'
import css from './ImageInput.module.scss'
import classnames from 'classnames'
import { ACCEPTED_IMAGE_FORMATS } from 'utils/const'
import IconClip from 'assets/icons/IconClip'

const ImageInput = ({
  className,
  label = 'Upload a file',
  name,
  onChange,
  isWithPreview,
  styles,
  ...props
}) => {
  const [preview, setPreview] = useState(null)
  const formats = ACCEPTED_IMAGE_FORMATS.join(', ')

  const readPreviewUrl = evt => {
    const file = evt.target?.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = evt => {
        setPreview(evt.target.result)
      }
    }
  }

  const getFileName = value => {
    const pathSeparator = value.indexOf('\\') >= 0
      ? '\\'
      : '//'
    const treeArray = value.split(pathSeparator)

    return treeArray[treeArray.length - 1]
  }

  const renderPreview = () => {
    if (isWithPreview && !preview) {
      return (
        <IconClip className={css.icon} />
      )
    }

    if (isWithPreview && preview) {
      return (
        <img
          className={css.preview}
          src={preview}
          alt="Driver's license"
        />
      )
    }

    return null
  }

  return (
    <div
      className={classnames(css.wrapper, className, {
        [css.wrapperWithPreview]: isWithPreview
      })}
      style={{...styles}}
    >
      <label
        className={css.label}
        htmlFor={name}
      >
        { renderPreview() }
        <span>
          { preview ? getFileName(props.value) : label }
        </span>
      </label>
      <input
        name={name}
        className={'visuallyHidden'}
        type='file'
        id={name}
        accept={formats}
        onChange={evt => {
          onChange && onChange(evt)
          isWithPreview && readPreviewUrl(evt)
        }}
        {...props}
      />
    </div>
  )
}

export default ImageInput
