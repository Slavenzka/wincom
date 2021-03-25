import React from 'react'
import css from './FormControls.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { ButtonHeights, ButtonPalettes } from 'utils/const'

const FormControls = ({
  className,
  submitButtonLabel = 'Save',
  submitButtonHandler,
  cancelButtonLabel = 'Cancel',
  cancelButtonHandler
}) => {
  return (
    <div className={classnames(css.wrapper, className)}>
      <Button
        className={css.button}
        palette={ButtonPalettes.BORDERED}
        height={ButtonHeights.LARGE}
        onClick={cancelButtonHandler}
      >
        { cancelButtonLabel }
      </Button>
      <Button
        className={css.button}
        height={ButtonHeights.LARGE}
        onClick={submitButtonHandler}
      >
        { submitButtonLabel }
      </Button>
    </div>
  )
}

export default FormControls
