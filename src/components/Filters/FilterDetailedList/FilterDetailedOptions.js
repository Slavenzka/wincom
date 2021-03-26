import React, { useCallback, useState } from 'react'
import css from './FilterDetailedOptions.module.scss'
import Input from 'components/Input/Input'
import { DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT, DetailedFilterTypes } from 'utils/const'
import SimpleBar from 'simplebar-react'
import FilterDetailedItemRange
  from 'components/Filters/FilterDetailedItemRange/FilterDetailedItemRange'
import { checkIfNonEmptyArray } from 'utils'
import FilterDetailedItemCheck
  from 'components/Filters/FilterDetailedItemCheck/FilterDetailedItemCheck'
import { setDetailedFilteredValues } from 'store/actions'
import { useDispatch } from 'react-redux'

const getManualFilteredOptions = (list, manualInput) => {
  return `${manualInput}`.length === 0
    ? list
    : list.filter(item => item.toUpperCase().indexOf(manualInput.toUpperCase()) >= 0)
}

const FilterDetailedOptions = ({
  data,
  isList,
  value,
  values,
  type,
  isOpen,
  currencySymbol,
  placeholder,
  field,
}) => {
  const [manualInput, setManualInput] = useState('')
  const dispatch = useDispatch()

  const isInputRequired = isList && data.length > DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT
  const isScrollbarRequired = isList

  const listManualFiltered = getManualFilteredOptions(data, manualInput)

  const handleUpdateFilter = useCallback((field, type, value) => {
    dispatch(setDetailedFilteredValues({
      field,
      type,
      values: value
    }))
  }, [dispatch])

  const handleUpdateRangeValue = useCallback((updatedLimit, type) => {
    !Number.isNaN(updatedLimit) && value[type] !== updatedLimit && handleUpdateFilter(field, type, {
      ...value,
      [type]: updatedLimit
    })
  }, [value, field, handleUpdateFilter])

  const renderOption = ({item, field, type, index}) => {
    switch (type) {
      case DetailedFilterTypes.INPUT:
        return (
          <>
            <input
              onChange={evt => handleUpdateFilter(field, type, evt.target.value)}
              value={value || ''}
              type='text'
            />
          </>
        )
      case DetailedFilterTypes.RANGE:
        return (
          <FilterDetailedItemRange
            field={field}
            actualMin={value.from}
            actualMax={value.to}
            currencySymbol={currencySymbol}
            onChange={handleUpdateRangeValue}
          />
        )
      case DetailedFilterTypes.ROUTE_FROM:
      case DetailedFilterTypes.ROUTE_TO:
      default:
        const itemID = `${field}.${index}`
        const isChecked = checkIfNonEmptyArray(values) && values.indexOf(item) >= 0
        let itemLabel = item

        if (`${item}`.toUpperCase() === 'TRUE') {
          itemLabel = 'Yes'
        }

        if (`${item}`.toUpperCase() === 'FALSE') {
          itemLabel = 'No'
        }

        return (
          <FilterDetailedItemCheck
            isChecked={isChecked}
            onChange={() => handleUpdateFilter(field, type, item)}
            id={itemID}
            label={itemLabel}
          />
        )
    }
  }

  const renderOptionItems = () => listManualFiltered.map((item, index) => {
    // special flag to render only one input or range
    const isRenderRequired = isOpen && (isList || index === 0)

    return isRenderRequired
      ? (
        <li className={css.subitem} key={index}>
          { renderOption({item, field, type, index}) }
        </li>
      )
      : null
  })

  const renderOptionsList = isScrollRequired => isScrollRequired
    ? (
      <SimpleBar
        style={{
          maxHeight: `${DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT * 3.2}rem`,
        }}
        autoHide={false}
      >
        <ul className={css.sublist}>
          { renderOptionItems() }
        </ul>
      </SimpleBar>
    )
    : (
      <ul className={css.sublist}>
        { renderOptionItems() }
      </ul>
    )

  const handleUpdateManualInput = value => {
    setManualInput(value)
  }

  return (
    <>
      {isInputRequired &&
        <Input
          value={manualInput}
          onChange={evt => handleUpdateManualInput(evt.target.value, 'from')}
          className={css.input}
          placeholder={placeholder}
          isDetailedFilerStyle
        />
      }
      { listManualFiltered.length > 0
        ? renderOptionsList(isScrollbarRequired)
        : <p className={css.messageNoOptions}>No options matching search query</p>
      }
    </>
  )
}

export default FilterDetailedOptions
