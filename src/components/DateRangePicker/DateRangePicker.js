import React, {useState, useCallback, useRef} from 'react'
import css from './DateRangePicker.module.scss'
import classnames from 'classnames'
import Datepicker from 'components/Datepicker/Datepicker'
import { getDateComponents } from 'utils'
import IconCalendarSimplified from 'assets/icons/IconCalendarSimplified'

const DateRangePicker = () => {
  const INITIAL_STATE = {
    from: null,
    to: null,
    selected: {
      from: null,
      to: null,
    }
  }

  const [range, setRange] = useState(INITIAL_STATE)
  const [isOpen, setOpenStatus] = useState(false)
  const [resetRef, setResetRef] = useState(0)
  const wrapperRef = useRef(null)

  const handleClickCancel = () => {
    setResetRef(prevState => prevState + 1)
    setRange(INITIAL_STATE)
    setOpenStatus(false)
  }

  const handleClickApply = () => {
    setRange(prevState => ({
      ...prevState,
      selected: {
        from: prevState.from,
        to: prevState.to
      }
    }))
  }

  const renderDateRange = (from, to) => {
    const { year: yearFrom, month: monthFrom, day: dayFrom } = getDateComponents(new Date(from))
    const { year: yearTo, month: monthTo, day: dayTo } = getDateComponents(new Date(to))

    return `${dayFrom}.${monthFrom}.${yearFrom} - ${dayTo}.${monthTo}.${yearTo}`
  }

  const handleSelectStartDate = useCallback(data => {
    setRange(prevState => {
      return {
        ...prevState,
        from: data
      }
    })
  }, [])

  const handleSelectEndDate = useCallback(data => {
    setRange(prevState => {
      return {
        ...prevState,
        to: data
      }
    })
  }, [])

  return (
    <div className={css.wrapper}>
      <button
        className={css.trigger}
        onClick={() => setOpenStatus(!isOpen)}
        type='button'
      >
        { range.selected.from && range.selected.to ? renderDateRange(range.selected.from, range.selected.to) : `Select range` }
        <IconCalendarSimplified className={css.icon} />
      </button>
      <div
        className={classnames(css.datepickerWrapper, {
          [css.datepickerWrapperOpened]: isOpen
        })}
      >
        <Datepicker
          contentClassName={css.date}
          onDateSelect={handleSelectStartDate}
          externalResetRef={resetRef}
          isCalendarAlwaysOpen
          isSelectedOnDayClick
          isRangeStyle
        />
        <Datepicker
          contentClassName={css.date}
          onDateSelect={handleSelectEndDate}
          externalResetRef={resetRef}
          isCalendarAlwaysOpen
          isSelectedOnDayClick
          isRangeStyle
        />
        <div className={css.controls}>
          <button
            onClick={handleClickCancel}
            type='button'
          >
            Cancel
          </button>
          <button
            onClick={handleClickApply}
            type='button'
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
