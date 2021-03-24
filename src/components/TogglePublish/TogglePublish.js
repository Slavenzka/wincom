import React, { useCallback } from 'react'
import css from './TogglePublish.module.scss'
import { toggleModal } from 'store/actions'
import ModalMessage from 'components/Modal/ModalMessage/ModalMessage'
import classnames from 'classnames'
import { Controller } from 'react-hook-form'
import Checkbox from 'components/Checkbox/Checkbox'
import { useDispatch } from 'react-redux'

const TogglePublish = ({
  label,
  name,
  control,
  setValue,
  isPublished,
}) => {
  const dispatch = useDispatch()

  const handleTogglePublish = useCallback(newStatus => {
    const handleConfirmUpdatePublish = () => {
      console.log('Submit')
    }

    const handleCancelUpdatePublish = () => {
      console.log('cancel')
      const status = !isPublished
      setValue(name, !status)
    }

    dispatch(toggleModal((
      <ModalMessage
        title={ `Are you sure?` }
        descriptor={newStatus
          ? `Do you really want to publish this car on App?`
          : `Do you really want to hide this car on App?`
        }
        buttonClickHandler={handleConfirmUpdatePublish}
        isCancelRequired={true}
        cancelClickHandler={handleCancelUpdatePublish}
      />
    )))
  }, [])

  return (
    <span className={classnames(css.legend, css.legendCheckbox)}>
      { label }
      <Controller
        control={control}
        name={name}
        render={({value, name, onChange}) => (
          <Checkbox
            className={css.checkbox}
            checked={value}
            name={name}
            onChange={evt => {
              onChange(evt.target.checked)
              handleTogglePublish(evt.target.checked)
            }}
          />
        )}
        defaultValue={isPublished}
      />
    </span>
  )
}

export default TogglePublish
