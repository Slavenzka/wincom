import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalCreateItem from 'components/Modal/ModalCreateItem/ModalCreateItem'
import StatusToggle from 'components/StatusToggle/StatusToggle'
import { Controller } from 'react-hook-form'

const useCreateCustomer = () => {
  const dispatch = useDispatch()

  return useCallback(() => {
    const handleSubmit = data => {
      console.log(data)
    }

    const renderExtraBlock = control => (
      <Controller
        render={({name, value, onChange}) => (
          <StatusToggle
            name={name}
            checked={value}
            onChange={evt => onChange(evt.target.checked)}
            styles={{
              marginTop: '2.7rem'
            }}
          />
        )}
        control={control}
        name={ `create-customer-status` }
        defaultValue={false}
      />
    )

    dispatch(toggleModal((
      <ModalCreateItem
        title={ `Add customer` }
        submitHandler={handleSubmit}
        submitLabel={ `+ Add customer` }
        extraBlock={renderExtraBlock}
      />
    )))
  }, [])
}

export default useCreateCustomer
