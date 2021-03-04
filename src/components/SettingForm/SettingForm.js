import React from 'react'
import css from './SettingForm.module.scss'
import { useForm } from 'react-hook-form'
import useRenderFormItems from 'hooks/useRenderFormItems'
import Button from 'components/Button/Button'
import { ButtonHeights, ButtonPalettes } from 'utils/const'

const SettingForm = ({
  className,
  title,
  list,
  submitForm
}) => {
  const { control, handleSubmit } = useForm()

  const formItems = useRenderFormItems({
    list,
    control
  })

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h3 className={css.subheading}>
          { title }
        </h3>
        <div className={css.wrapper}>
          { formItems }
          <Button
            className={css.button}
            palette={ButtonPalettes.BORDERED}
            height={ButtonHeights.LARGE}
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            className={css.button}
            height={ButtonHeights.LARGE}
            onClick={() => {}}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SettingForm
