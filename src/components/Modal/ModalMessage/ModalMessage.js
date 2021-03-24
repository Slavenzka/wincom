import React from 'react'
import css from './ModalMessage.module.scss'
import classnames from 'classnames'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import { ButtonPalettes } from 'utils/const'

const ModalMessage = ({
  title,
  descriptor,
  error,
  buttonLabel = 'Go back',
  buttonClickHandler,
  isCancelRequired = false,
  cancelLabel = `Cancel`,
  cancelClickHandler,
}) => {
  const dispatch = useDispatch()

  const defaultClickHandler = () => {
    dispatch(toggleModal(null))
  }

  const handleClickButton = buttonClickHandler || defaultClickHandler

  return (
    <div className={classnames(css.wrapper, {
      [css.wrapperLarge]: isCancelRequired
    })}>
      {title &&
        <h3 className={css.title}>
          { title }
        </h3>
      }
      {descriptor &&
        <p className={css.descriptor}>
          { descriptor }
        </p>
      }
      {error &&
        <p className={css.error} dangerouslySetInnerHTML={{ __html: error }} />
      }
      <div
        className={classnames({
          [css.controls]: isCancelRequired
        })}
      >
        {isCancelRequired &&
          <Button
            className={css.button}
            onClick={() => {
              cancelClickHandler && cancelClickHandler()
              defaultClickHandler()
            }}
            palette={ButtonPalettes.BORDERED}
            type={ `button` }
          >
            { cancelLabel }
          </Button>
        }
        <Button
          className={css.button}
          onClick={handleClickButton}
          type={ `button` }
        >
          { buttonLabel }
        </Button>
      </div>
    </div>
  )
}

export default ModalMessage
