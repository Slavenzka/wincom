import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalCreateItem from 'components/Modal/ModalCreateItem/ModalCreateItem'
import { Controller } from 'react-hook-form'
import ImageInput from 'components/ImageInput/ImageInput'
import { RequestMethods } from 'utils/const'

const useCreateDriver = fetchData => {
  const dispatch = useDispatch()
  const licenseRef = useRef(null)

  return useCallback(() => {
    const prefix = `create-carrier`

    const renderExtraBlock = (control, errors) => (
      <Controller
        render={({value, name, onChange}) => (
          <ImageInput
            name={name}
            onChange={evt => {
              licenseRef.current = evt?.target?.files?.[0]
              onChange(evt)}
            }
            value={value}
            label={ `Attach a license` }
            styles={{ marginTop: '2rem' }}
            isWithPreview
            isError={errors[name]}
          />
        )}
        control={control}
        name={ `${prefix}-license` }
        defaultValue={''}
        rules={{
          required: true
        }}
      />
    )

    const getDataToSubmit = formData => {
      const image = licenseRef.current

      const test = new FormData()
      test.append('newCarrierRequest', new Blob([JSON.stringify({
        name: formData[`${prefix}-name`],
        phone: formData[`${prefix}-phone`],
      })], {
        type: 'application/json'
      }))
      image && test.append('fullLicenceImage', image)

      return test
    }

    dispatch(toggleModal((
      <ModalCreateItem
        title={ `Add carrier` }
        inputNamePrefix={ prefix }
        submitLabel={ `+ Add carrier` }
        submitDataGetter={getDataToSubmit}
        submitConfig={{
          url: `/api/manager/carrier`,
          method: RequestMethods.POST,
          options: {
            isFetchLater: true,
            callbackOnFetch: response => {
              console.log(response?.data?.sendMessageResponse?.status)
              if (response?.data?.sendMessageResponse?.status === 'SENT') {
                dispatch(toggleModal(null))
                fetchData()
              }
            }
          },
        }}
        extraBlock={renderExtraBlock}
      />
    )))
  }, [dispatch, fetchData])
}

export default useCreateDriver
