import React  from 'react'
import css from './DetailsForm.module.scss'
import { useForm } from 'react-hook-form'
import TableControls from 'components/TableControls/TableControls'
import useRenderFormItems from 'hooks/useRenderFormItems'
import TogglePublish from 'components/TogglePublish/TogglePublish'
import NoDataMessage from 'components/NoDataMessage/NoDataMessage'

const DetailsForm = ({
  rawData,
  getFormItems,
  submitForm,
  infoBlock,
  isWithControls = true,
  children,
}) => {
  const data = rawData || {}
  const inputsList = getFormItems(data)
  const list = Object.values(inputsList)
  const defaultFormData = list.reduce((total, {name, defaultValue}) => {
    total[name] = defaultValue
    return total
  }, {})
  const {id, isPublished} = data
  const isPublishedSwitchRequired = data.hasOwnProperty('isPublished')

  const {register, control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {...defaultFormData}
  })
  const isDataPublished = watch(`${id}-isPublished`, isPublished)

  const formItems = useRenderFormItems({
    list,
    control,
    register,
    isDisabled: isDataPublished
  })

  if (Object.keys(data).length === 0 || list.length === 0) {
    return (
      <NoDataMessage />
    )
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={css.intro}>
        <span className={css.legend}>
          { `ID #${id}` }
        </span>
        {isPublishedSwitchRequired &&
          <TogglePublish
            label={ `Published (on App)` }
            name={ `${id}-isPublished` }
            control={control}
            setValue={setValue}
            isPublished={isDataPublished}
          />
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
