import React, { useState, useEffect, useRef, useCallback } from 'react'
import css from './FilterDetailedItem.module.scss'
import classnames from 'classnames'
import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDetailedFilteredValues } from 'store/actions'
import { DetailedFilterTypes } from 'utils/const'
import IconCross from 'assets/icons/IconCross'
import Input from 'components/Input/Input'
import FilterDetailedItemCheck
  from 'components/Filters/FilterDetailedItemCheck/FilterDetailedItemCheck'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import FilterDetailedItemRange
  from 'components/Filters/FilterDetailedItemRange/FilterDetailedItemRange'

const DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT = 4

const getLimitValues = (data, fieldName) => {
  return data.reduce((total, item) => {
    const itemValue = getObjPropertyViaString(item, fieldName)

    if (total.min === 0 && itemValue > 0) {
      total.min = itemValue
    }

    if (total.min !== 0 && itemValue < total.min) {
      total.min = itemValue
    }

    if (total.max === Infinity) {
      total.max = itemValue
    }

    if (total.max !== Infinity && itemValue > total.max) {
      total.max = itemValue
    }

    return total
  }, {
    min: 0,
    max: Infinity
  })
}

const FilterDetailedItem = ({
  label,
  field,
  type,
  value,
  values,
  currencySymbol,
  observer,
  inputPlaceholder = 'Enter search value',
}) => {
  const contentRef = useRef(null)
  const [manualInput, setManualInput] = useState('')
  const [isOpen, setOpenStatus] = useState(false)
  const secondaryFilteredData = useSelector(store => store.filter.secondaryFilteredData) || []
  const dispatch = useDispatch()

  const isListType = type === DetailedFilterTypes.LIST
  const isRangeType = type === DetailedFilterTypes.RANGE

  // move closing logic to separate hook useCloseModal
  const handleClickOutside = useCallback(evt => {
    if (isOpen && contentRef.current && !contentRef.current.contains(evt.target) && type !== DetailedFilterTypes.RANGE) {
      setOpenStatus(false)
    }
  }, [isOpen, type])

  const handleEscPress = useCallback(evt => {
    if (isOpen && evt.key === 'Escape') {
      setOpenStatus(false)
    }
  }, [isOpen])

  useEffect(() => {
    observer.push(() => setOpenStatus(false))
  }, [observer])

  useEffect(() => {
    const dropdown = contentRef.current

    if (dropdown) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscPress)
    }

   return () => {
     dropdown && document.removeEventListener('click', handleClickOutside)
     document.removeEventListener('keydown', handleEscPress)
   }
  }, [isOpen, handleClickOutside, handleEscPress])

  const handleResetFilter = () => {
    observer.forEach(fn => fn())
  }

  const getDataOptions = field => {
    const list = secondaryFilteredData.reduce((total, item) => {
      const fieldValue = getObjPropertyViaString(item, field)
      total.push(fieldValue)
      return total
    }, [])

    return [...new Set(list)]
  }

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
        const {min, max} = getLimitValues(secondaryFilteredData, field)
        return (
          <FilterDetailedItemRange
            minValue={min}
            actualMin={value?.from || min}
            maxValue={max}
            actualMax={value?.to || max}
            currencySymbol={currencySymbol}
            onChange={handleUpdateRangeValue}
          />
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
          <FilterDetailedItemCheck
            isChecked={isChecked}
            onChange={() => handleUpdateFilter(field, type, item)}
            id={itemID}
            label={itemLabel}
          />
        )
    }
  }

  const renderOptionsList = (field, type) => {
    const list = getDataOptions(field)

    const listManualFiltered = `${manualInput}`.length === 0
      ? list
      : list.filter(item => item.toUpperCase().indexOf(manualInput.toUpperCase()) >= 0)

    const items = listManualFiltered.map((item, index) => {
    // special flag to render only one input or range
    const isRenderRequired = isOpen && (type === DetailedFilterTypes.LIST || index === 0)

      return isRenderRequired
        ? (
          <li className={css.subitem} key={index}>
            { renderOption({item, field, type, index}) }
          </li>
        )
        : null
    })

    const itemLabel = checkIfNonEmptyArray(values)
      ? `${values.length} selected`
      : ``

    return (
      <div
        className={classnames(css.sublistWrapper, {
          [css.sublistWrapperVisible]: isOpen,
          [css.sublistWrapperList]: isListType,
          [css.sublistWrapperRange]: isRangeType,
        })}
        ref={contentRef}
      >
        <header className={css.header}>
          <span className={css.headerLabel}>
            { itemLabel }
          </span>
          <button
            className={css.buttonClose}
            onClick={() => setOpenStatus(prevState => !prevState)}
            type={ `button` }
          >
            Close list
            <IconCross className={css.icon} />
          </button>
        </header>
        <div className={css.content}>
          {isListType && list.length > DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT &&
            <Input
              value={manualInput}
              onChange={evt => setManualInput(evt.target.value)}
              className={css.input}
              placeholder={inputPlaceholder}
              isDetailedFilerStyle
            />
          }
          {type === DetailedFilterTypes.LIST &&
            <SimpleBar
              style={{
                maxHeight: `${DETAILED_FILTER_MAX_QTY_WITHOUT_MANUAL_INPUT * 3}rem`,
              }}
              autoHide={false}
            >
              <ul className={css.sublist}>
                {items}
              </ul>
            </SimpleBar>
          }
          {type !== DetailedFilterTypes.LIST &&
            <ul className={css.sublist}>
              {items}
            </ul>
          }
        </div>
      </div>
    )
  }

  const handleClickTrigger = () => {
    setOpenStatus(prevState => !prevState)
  }

  return (
    <div className={css.wrapper}>
      <button
        onClick={() => {
          handleResetFilter()
          handleClickTrigger()
        }}
        className={classnames(css.trigger, {
          [css.triggerOpen]: isOpen
        })}
        type='button'
      >
        { label }
      </button>
      { renderOptionsList(field, type) }
    </div>
  )
}

export default FilterDetailedItem
