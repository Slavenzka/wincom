import React from 'react'
import { Controller } from 'react-hook-form'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'
import Input from 'components/Input/Input'
import Datepicker from 'components/Datepicker/Datepicker'
import { getDateComponents } from 'utils'
import IconCalendar from 'assets/icons/IconCalendar'

const useRenderFormItems = ({list, register, control}) => {
  const renderFormItems = () => list.map(({type, validation, ...item}, index) => {
    switch (type) {
      case 'select':
        return (
          <Controller
            as={SelectDropdown}
            control={control}
            rules={{
              ...validation
            }}
            key={index}
            {...item}
          />
        )
      case 'inputCash':
        return (
          <Controller
            as={Input}
            control={control}
            rules={{
              ...validation
            }}
            key={index}
            isCash
            {...item}
          />
        )
      case 'datepicker':
        return (
          <Datepicker
            isSingleDaySelection
            defaultDate={new Date(item.date)}
            key={index}
            {...item}
          >
            { ({data, onClick}) => {
              const {year, month, day} = getDateComponents(data.selected.from)
              const dateToRender = `${day}-${month}-${year}`

              return (
                <Input
                  style={{
                    cursor: 'pointer'
                  }}
                  register={register({
                    ...validation
                  })}
                  name={item.name}
                  value={dateToRender}
                  onClick={onClick}
                  label={item.label}
                  readOnly
                >
                  <IconCalendar className={'calendar'} />
                </Input>
              )
            }}
          </Datepicker>
        )
      default:
        return (
          <Controller
            as={Input}
            control={control}
            rules={{
              ...validation
            }}
            key={index}
            {...item}
          />
        )
    }
  })

  return renderFormItems()
}

export default useRenderFormItems
