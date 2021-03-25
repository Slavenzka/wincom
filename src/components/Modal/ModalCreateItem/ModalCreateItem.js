import React from 'react'
import css from './ModalCreateItem.module.scss'
import { useForm } from 'react-hook-form'
import useRenderFormItems from 'hooks/useRenderFormItems'
import Button from 'components/Button/Button'
import Heading from 'components/Heading/Heading'
import { HeadingTypes } from 'utils/const'
import { validatePhone } from 'utils'

const ModalCreateItem = ({
  title,
  extraBlock,
  submitHandler,
  submitLabel = 'Save',
}) => {
  const formData = [
    {
      type: 'input',
      label: 'Name',
      name: `${title}-name`,
      placeholder: 'Enter name',
      validation: {
        required: true
      },
      isModal: true,
    },
    {
      type: 'input',
      label: 'Phone',
      name: `${title}-phone`,
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
        { extraBlock && extraBlock(control) }
        <Button
          className={css.button}
          type={ `submit` }
        >
          { submitLabel }
        </Button>
      </div>
    </form>
  )
}

export default ModalCreateItem
