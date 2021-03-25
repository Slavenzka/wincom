import React from 'react'
import { Controller } from 'react-hook-form'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'
import Input from 'components/Input/Input'
import Datepicker from 'components/Datepicker/Datepicker'
import { getDateComponents } from 'utils'
import IconCalendar from 'assets/icons/IconCalendar'

const useRenderFormItems = ({list, register, control, isDisabled, errors = {}}) => {
  const renderFormItems = () => list.map(({type, validation, name, defaultValue = '', isModal, ...item}, index) => {
    switch (type) {
      case 'select':
        return (
          <Controller
            render={({name, value, onChange}) => (
              <SelectDropdown
                name={name}
                value={value}
                onChange={onChange}
                isDisabled={isDisabled}
                {...item}
              />
            )}
            control={control}
            rules={{
              ...validation
            }}
            name={name}
            defaultValue={defaultValue}
            key={index}
          />
        )
      case 'inputCash':
        return (
          <Controller
            render={({value, name, onChange}) => (
              <Input
                value={value}
                name={name}
                onChange={onChange}
                isCash
                isDisabled={isDisabled}
                {...item}
              />
            )}
            control={control}
            rules={{
              ...validation
            }}
            key={index}
            name={name}
            defaultValue={defaultValue}
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
                  name={name}
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
            render={({name, value, onChange}) => (
              <Input
                name={name}
                value={value}
                onChange={onChange}
                isDisabled={isDisabled}
                isError={errors[name]}
                isModalStyle={isModal}
                {...item}
              />
            )}
            control={control}
            rules={{
              ...validation
            }}
            name={name}
            defaultValue={defaultValue}
            key={index}
          />
        )
    }
  })

  return renderFormItems()
}

export default useRenderFormItems
