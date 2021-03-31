import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalCreateItem from 'components/Modal/ModalCreateItem/ModalCreateItem'
import StatusToggle from 'components/StatusToggle/StatusToggle'
import { Controller } from 'react-hook-form'
import { RequestMethods } from 'utils/const'

const useCreateCustomer = ({fetchData}) => {
  const dispatch = useDispatch()

  return useCallback(() => {
    const prefix = `create-customer`

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
        name={ `${prefix}-status` }
        defaultValue={false}
      />
    )

    const getDataToSubmit = formData => ({
      name: formData[`${prefix}-name`],
      phone: formData[`${prefix}-phone`],
      isTrusted: formData[`${prefix}-status`]
    })

    dispatch(toggleModal((
      <ModalCreateItem
        title={ `Add customer` }
        inputNamePrefix={ prefix }
        extraBlock={renderExtraBlock}
        submitLabel={ `+ Add customer` }
        submitDataGetter={getDataToSubmit}
        submitConfig={{
          url: `/api/manager/customer`,
          method: RequestMethods.POST,
          options: {
            isFetchLater: true,
            callbackOnFetch: response => {
              if (response?.data?.sendMessageResponse?.status === 'SENT') {
                dispatch(toggleModal(null))
                fetchData()
              }
            }
          },
        }}
      />
    )))
  }, [dispatch, fetchData])
}

export default useCreateCustomer
