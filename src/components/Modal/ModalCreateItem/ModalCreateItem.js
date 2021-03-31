import React from 'react'
import css from './ModalCreateItem.module.scss'
import { useForm } from 'react-hook-form'
import useRenderFormItems from 'hooks/useRenderFormItems'
import Button from 'components/Button/Button'
import Heading from 'components/Heading/Heading'
import { HeadingTypes } from 'utils/const'
import { validatePhone } from 'utils'
import useDataFetch from 'hooks/useDataFetch'

const ModalCreateItem = ({
  title,
  inputNamePrefix,
  extraBlock,
  submitConfig,
  submitLabel = 'Save',
  submitDataGetter,
}) => {
  const formData = [
    {
      type: 'input',
      label: 'Name',
      name: `${inputNamePrefix}-name`,
      placeholder: 'Enter name',
      validation: {
        required: true
      },
      isModal: true,
    },
    {
      type: 'input',
      label: 'Phone',
      name: `${inputNamePrefix}-phone`,
      placeholder: 'Enter phone number',
      validation: {
        required: true,
        ...validatePhone()
      },
      isModal: true,
    },
  ]

  const {control, handleSubmit, errors} = useForm()
  const formItems = useRenderFormItems({
    list: formData,
    control,
    errors
  })

  const {fetchData, fetchingStatus} = useDataFetch(submitConfig)
  const {isLoading} = fetchingStatus

  const submitHandler = data => {
    if (submitDataGetter) {
      const dataToSubmit = submitDataGetter(data)
      fetchData(dataToSubmit)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={css.wrapper}>
        <Heading
          className={css.heading}
          tagName={HeadingTypes.H3}
        >
          { title }
        </Heading>
        <div className={css.form}>
          { formItems }
        </div>
        { extraBlock && extraBlock(control, errors) }
        <Button
          className={css.button}
          type={ `submit` }
          isLoading={isLoading}
        >
          { submitLabel }
        </Button>
      </div>
    </form>
  )
}

export default ModalCreateItem
