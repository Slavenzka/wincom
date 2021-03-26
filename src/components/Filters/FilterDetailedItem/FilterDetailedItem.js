import React, { useState, useEffect, useRef, useCallback } from 'react'
import css from './FilterDetailedItem.module.scss'
import classnames from 'classnames'
import { getDetailedItemLabel } from 'utils'
import { useSelector } from 'react-redux'
import { DetailedFilterTypes } from 'utils/const'
import IconCross from 'assets/icons/IconCross'
import { getDataOptions } from 'utils/filter'
import FilterDetailedOptions from 'components/Filters/FilterDetailedList/FilterDetailedOptions'

const MIN_DETAILED_FILTER_OPTIONS_QTY = 1

const FilterDetailedItem = ({
  label,
  type,
  value,
  values,
  observer,
  inputPlaceholder = 'Enter search value',
  detailedList,
  ...props
}) => {
  const {field} = props

  const contentRef = useRef(null)
  const [isOpen, setOpenStatus] = useState(false)
  const secondaryFilteredData = useSelector(store => store.filter.secondaryFilteredData)

  const isListType = type === DetailedFilterTypes.LIST || type === DetailedFilterTypes.ROUTE_FROM || type === DetailedFilterTypes.ROUTE_TO
  const isRouteType = type === DetailedFilterTypes.ROUTE_FROM || type === DetailedFilterTypes.ROUTE_TO
  const isRangeType = type === DetailedFilterTypes.RANGE

  const list = secondaryFilteredData
    ? getDataOptions({data: secondaryFilteredData, field, routeData: { detailedList, isRouteType, type }})
    : []
  const isFilterDisabled = !isRouteType && list.length <= MIN_DETAILED_FILTER_OPTIONS_QTY

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

  const renderOptionsList = (field, type) => {
    const itemLabel = getDetailedItemLabel({value, values})

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
          <FilterDetailedOptions
            data={list}
            isList={isListType}
            value={value}
            values={values}
            type={type}
            isOpen={isOpen}
            {...props}
          />
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
          [css.triggerDisabled]: isFilterDisabled,
          [css.triggerOpen]: isOpen
        })}
        type='button'
      >
        { label }
      </button>
      { !isFilterDisabled && renderOptionsList(field, type) }
    </div>
  )
}

export default FilterDetailedItem
