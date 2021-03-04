import React from 'react'
import css from './DetailsForm.module.scss'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import Checkbox from 'components/Checkbox/Checkbox'
import TableControls from 'components/TableControls/TableControls'
import useRenderFormItems from 'hooks/useRenderFormItems'

const DetailsForm = ({
  data,
  inputsList = {},
  submitForm,
  infoBlock,
  isWithControls = true,
  children,
}) => {
  const list = Object.values(inputsList)
  const defaultFormData = list.reduce((total, {name, defaultValue}) => {
    total[name] = defaultValue
    return total
  }, {})
  const {id, isPublished} = data
  const isPublishedSwitchRequired = data.hasOwnProperty('isPublished')

  const {register, control, handleSubmit} = useForm({
    defaultValues: {...defaultFormData}
  })

  const formItems = useRenderFormItems({
    list,
    control,
    register
  })

  if (list.length === 0) return null

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={css.intro}>
        <span className={css.legend}>
          { `ID #${id}` }
        </span>
        {isPublishedSwitchRequired &&
          <span className={classnames(css.legend, css.legendCheckbox)}>
            Published (on App)
            <Controller
              as={Checkbox}
              control={control}
              name={`${id}-isPublished`}
              defaultValue={isPublished}
              className={css.checkbox}
            />
          </span>
        }
      </div>
      <div className={css.wrapper}>
        <div className={css.info}>
          { infoBlock }
        </div>
        <div className={css.form}>
          { formItems }
        </div>
        <div className={css.aux}>
          { children(register) }
        </div>
      </div>
      {isWithControls &&
        <TableControls
          handleClickCancel={() => {}}
          handleClickOk={() => {}}
        />
      }
    </form>
  )
}

export default DetailsForm
