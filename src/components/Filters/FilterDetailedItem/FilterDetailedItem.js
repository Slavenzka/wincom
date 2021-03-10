import React, { useState } from 'react'
import css from './FilterDetailedItem.module.scss'
import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDetailedFilteredValues } from 'store/actions'
import { DetailedFilterTypes } from 'utils/const'

const FilterDetailedItem = ({
  label,
  field,
  type,
  value,
  values
}) => {
  const [isOpen, setOpenStatus] = useState(false)
  const secondaryFilteredData = useSelector(store => store.filter.secondaryFilteredData) || []
  const dispatch = useDispatch()

  const getDataOptions = field => {
    const list = secondaryFilteredData.reduce((total, item) => {
      const fieldValue = getObjPropertyViaString(item, field)
      total.push(fieldValue)
      return total
    }, [])

    return [...new Set(list)]
  }

  const handleUpdateFilter = (field, type, value) => {
    dispatch(setDetailedFilteredValues({
      field,
      type,
      values: value
    }))
  }

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
          <>
            <label htmlFor={field} className={css.label}>
              From:
            </label>
            <input
              onChange={evt => {
                !Number.isNaN(+evt.target.value) && handleUpdateFilter(field, type, {
                  ...value,
                  from: evt.target.value
                })
              }}
              value={value?.from || ''}
              type='text'
            />
            <label htmlFor={field} className={css.label}>
              To:
            </label>
            <input
              onChange={evt => {
                !Number.isNaN(+evt.target.value) && handleUpdateFilter(field, type, {
                  ...value,
                  to: evt.target.value
                })
              }}
              value={value?.to || ''}
              type='text'
            />
          </>
        )
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
          <>
            <label htmlFor={field} className={css.label}>
              { itemLabel }
            </label>
            <input
              type='checkbox'
              id={itemID}
              name={itemID}
              checked={isChecked}
              onChange={() => handleUpdateFilter(field, type, item)}
            />
          </>
        )
    }
  }

  const renderOptionsList = (field, type) => {
    const list = getDataOptions(field)

    const items = list.map((item, index) => {
    // special flag to render only one input or range
    const isRenderRequired = type === DetailedFilterTypes.LIST || index === 0

      return isRenderRequired
        ? (
          <li className={css.subitem} key={index}>
            { renderOption({item, field, type, index}) }
          </li>
        )
        : null
    })

    return (
      <ul className={css.sublist}>
        { items }
      </ul>
    )
  }

  const handleClickTrigger = () => {
    setOpenStatus(prevState => !prevState)
  }

  return (
    <div className={css.wrapper}>
      <button
        onClick={handleClickTrigger}
        className={css.trigger}
        type='button'
      >
        { label }
      </button>
      { renderOptionsList(field, type) }
    </div>
  )
}

export default FilterDetailedItem
