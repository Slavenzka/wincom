import React from 'react'
import css from './ModalError.module.scss'
import Button from 'components/Button/Button'

const ModalError = ({
  title,
  descriptor,
  buttonLabel,
  buttonClickHandler,
}) => {
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
      <Button
        className={css.button}
        onClick={buttonClickHandler}
        type={ `button` }
      >
        { buttonLabel }
      </Button>
    </div>
  )
}

export default ModalError
