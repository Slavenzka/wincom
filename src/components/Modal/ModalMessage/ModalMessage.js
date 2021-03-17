import React from 'react'
import css from './ModalMessage.module.scss'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'

const ModalMessage = ({
  title,
  descriptor,
  error,
  buttonLabel = 'Go back',
  buttonClickHandler,
}) => {
  const dispatch = useDispatch()

  const defaultClickHandler = () => {
    dispatch(toggleModal(null))
  }

  const handleClickButton = buttonClickHandler || defaultClickHandler

  return (
    <div className={css.wrapper}>
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
      <Button
        className={css.button}
        onClick={handleClickButton}
        type={ `button` }
      >
        { buttonLabel }
      </Button>
    </div>
  )
}

export default ModalMessage
