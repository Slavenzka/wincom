import React from 'react'
import css from './TableControls.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { ButtonHeights, ButtonPalettes } from 'utils/const'

const TableControls = ({
  className,
  isCancelRequired = true,
  cancelButtonLabel = 'Cancel',
  handleClickCancel,
  isOkRequired = true,
  okButtonLabel = 'Save',
  handleClickOk
}) => {
  return (
    <div className={classnames(css.wrapper, className)}>
      {isCancelRequired &&
        <Button
          className={css.button}
          onClick={handleClickCancel}
          palette={ButtonPalettes.BORDERED}
          height={ButtonHeights.LARGE}
        >
          { cancelButtonLabel }
        </Button>
      }
      {isOkRequired &&
        <Button
          className={css.button}
          onClick={handleClickOk}
          palette={ButtonPalettes.FILLED}
          height={ButtonHeights.LARGE}
          type='submit'
        >
          {okButtonLabel}
        </Button>
      }
    </div>
  )
}

export default TableControls
