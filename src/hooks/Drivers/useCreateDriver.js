import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalCreateItem from 'components/Modal/ModalCreateItem/ModalCreateItem'
import { Controller } from 'react-hook-form'
import ImageInput from 'components/ImageInput/ImageInput'

const useCreateDriver = () => {
  const dispatch = useDispatch()

  return useCallback(() => {
    const handleSubmit = data => {
      console.log(data)
    }

    const renderExtraBlock = control => (
      <Controller
        render={({value, name, onChange}) => (
          <ImageInput
            name={name}
            onChange={onChange}
            value={value}
            label={ `Attach a license` }
            styles={{ marginTop: '2rem' }}
            isWithPreview
          />
        )}
        control={control}
        name={ `create-carrier-license` }
        defaultValue={''}
      />
    )

    dispatch(toggleModal((
      <ModalCreateItem
        title={ `Add carrier` }
        submitHandler={handleSubmit}
        submitLabel={ `+ Add carrier` }
        extraBlock={renderExtraBlock}
      />
    )))
  }, [])
}

export default useCreateDriver
