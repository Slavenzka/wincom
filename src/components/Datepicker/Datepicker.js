import React, { useCallback, useEffect, useRef, useState } from 'react'
import css from './Datepicker.module.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// datepicker stuff
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { useDispatch } from 'react-redux'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'

const Datepicker = ({
  className,
  contentClassName,
  defaultDate,
  onDateSelect = () => {},
  isSingleDaySelection = true,
  isRangeStyle,
  isCalendarAlwaysOpen,
  isSelectedOnDayClick,
  externalResetRef,
  children,
}) => {
  const localization = {
    locale: 'ru',
    weekdaysShort: [
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT'
    ],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }

  const initialData = {
    from: defaultDate,
    to: null,
    enteredTo: null,
    selected: {
      from: defaultDate,
      to: null,
      enteredTo: null
    },
  }

  const dispatch = useDispatch()
  const [calendarState, updateCalendarState] = useState(initialData)
  const [isCalendarOpen, setCalendarOpen] = useState(isCalendarAlwaysOpen)
  const calendarWrapperRef = useRef(null)
  const buttonApplyRef = useRef(null)

  const isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  const handleDayClick = day => {
    const { from, to } = calendarState

    if (!isSingleDaySelection && from && to && day >= from && day <= to) {
      const date = defaultDate || null
      updateCalendarState(prevState => ({
        ...prevState,
        from: date,
        to: date,
        enteredTo: date
      }))
      return
    }

    if (isSingleDaySelection) {
      !isSelectedOnDayClick && updateCalendarState(prevState => ({
        ...prevState,
        from: day,
        to: day,
        enteredTo: null
      }))

      if (isSelectedOnDayClick) {
        updateCalendarState({
          from: day,
          to: day,
          enteredTo: null,
          selected: {
            from: day,
            to: day,
            enteredTo: null
          }
        })
        console.log(111111)
        handleCloseCalendar()
      }
      // dispatch(setCalendarData(day, day, null))
    } else if (isSelectingFirstDay(from, to, day)) {
      updateCalendarState(prevState => ({
        ...prevState,
        from: day,
        to: null,
        enteredTo: null
      }))
      // dispatch(setCalendarData(day, null, null))
    } else {
      updateCalendarState(prevState => ({
        ...prevState,
        from: from,
        to: day,
        enteredTo: day
      }))
      // dispatch(setCalendarData(from, day, day))
    }
  }

  const handleClickApply = () => {
    updateCalendarState(prevState => ({
      ...prevState,
      selected: {
        from: prevState.from,
        to: prevState.to,
        enteredTo: prevState.enteredTo
      }
    }))
  }

  const handleResetClick = useCallback(() => {
    // dispatch(resetCalendarFilter(date, date, null))
    updateCalendarState({
        from: defaultDate,
        to: null,
        enteredTo: null,
        selected: {
          from: defaultDate,
          to: null,
          enteredTo: null,
        }
    })
  }, [])

  const handleCloseCalendar = useCallback(() => {
    !isCalendarAlwaysOpen && setCalendarOpen(false)
  }, [isCalendarAlwaysOpen])

  const handleToggleCalendar = () => {
    !isCalendarAlwaysOpen && setCalendarOpen(state => !state)
  }

  const YearMonthSelector = ({ date, onChange }) => {
    const fromMonth = new Date(2021, new Date().getMonth())
    const toMonth = new Date(2021 + 10, 11)

    const monthOptions = localization.months.map(item => ({
      label: item,
      value: item
    }))

    const years = [];
    for (let i = fromMonth.getFullYear() - 1; i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }

    const yearOptions = years.map(item => ({
      label: item,
      value: item
    }))

    const handleChange = function handleChange(evt) {
      const updatedObject = {
        year: {
          label: date.getFullYear(),
          value: date.getFullYear()
        },
        month: {
          label: localization.months[date.getMonth()],
          value: localization.months[date.getMonth()],
        },
        ...evt
      }
      const { year, month } = updatedObject
      onChange(new Date(year.value, localization.months.findIndex(item => item === month.value)));
    }

    return (
      <div className={'DayPicker-Caption'}>
        <div className={css.selectWrapper}>
          <SelectDropdown
            className={classnames(css.select, css.selectMonth)}
            onChange={evt => handleChange({
              month: evt
            })}
            value={{
              label: localization.months[date.getMonth()],
              value: localization.months[date.getMonth()],
            }}
            options={monthOptions}
            dropdownComponent={<span className={css.arrow} />}
          />
          <SelectDropdown
            className={classnames(css.select, css.selectYear)}
            onChange={evt => handleChange({
              year: evt
            })}
            value={{
              label: date.getFullYear(),
              value: date.getFullYear()
            }}
            options={yearOptions}
            dropdownComponent={<span className={css.arrow} />}
          />
        </div>
      </div>
    )
  }

  const handleYearMonthChange = month => {
    updateCalendarState(prevState => {
      return {
        ...prevState,
        month
      }
    })
  }

  useEffect(() => {
    if (isSingleDaySelection && !calendarState.from) {
      const date = defaultDate
      updateCalendarState(prevState => ({
        ...prevState,
        from: date,
        to: date,
        enteredTo: null
      }))
      // dispatch(setCalendarData(date, date, null))
      // dispatch(applyFiltration())
    }

    if (isSingleDaySelection && isSelectedOnDayClick && calendarState.from) {
      onDateSelect(calendarState.from)
    }
  }, [dispatch, isSingleDaySelection, isSelectedOnDayClick, defaultDate, calendarState.from, onDateSelect])

  useEffect(() => {
    handleResetClick()
  }, [externalResetRef, handleResetClick])

  useEffect(() => {
    if (defaultDate) {
      // dispatch(setCalendarData(defaultDate, defaultDate, null))
    }
  }, [defaultDate, dispatch])

  const handleClickOutside = useCallback(evt => {
    if (calendarWrapperRef.current === evt.target) {
      updateCalendarState(prevState => ({
        ...prevState,
        from: prevState.selected.from,
        to: prevState.selected.to,
        enteredTo: prevState.selected.enteredTo
      }))
      handleCloseCalendar()
    }
  }, [handleCloseCalendar])

  useEffect(() => {
    !isCalendarAlwaysOpen && document.addEventListener('click', handleClickOutside)

    return () => {
      !isCalendarAlwaysOpen && document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside, isCalendarAlwaysOpen])

  const { from, enteredTo } = calendarState
  const modifiers = { start: from, end: enteredTo }
  const disabledDays = { before: from }
  const selectedDays = [from, { from, to: enteredTo }]

  return (
    <div className={classnames(css.wrapper, className)}>
      {isCalendarOpen && !isCalendarAlwaysOpen &&
        <div className={css.background} ref={calendarWrapperRef} />
      }
      { children && children({
        data: calendarState,
        onClick: handleToggleCalendar,
      })}
      {isCalendarOpen &&
        <div
          className={classnames(css.content, contentClassName, {
            [css.contentRange]: isRangeStyle
          })}
        >
          <DayPicker
            className={css.datepicker}
            numberOfMonths={1}
            selectedDays={selectedDays}
            disabledDays={isSingleDaySelection ? null : disabledDays}
            modifiers={modifiers}
            onDayClick={handleDayClick}
            locale={localization.locale}
            month={calendarState.month}
            firstDayOfWeek={0}
            captionElement={({ date, localeUtils }) => (
              <YearMonthSelector
                date={date}
                localeUtils={localeUtils}
                onChange={handleYearMonthChange}
              />
            )}
            navbarElement={() => null}
          />
          {!isSelectedOnDayClick &&
            <div className={css.controls}>
              <button
                className={classnames(css.btnControl, css.btnControlApply)}
                onClick={() => {
                  // dispatch(setCalendarData(from, to, enteredTo))
                  // dispatch(applyFiltration())
                  handleClickApply()
                  onDateSelect(calendarState)
                  handleCloseCalendar()
                }}
                ref={buttonApplyRef}
              >
                Apply
              </button>
              <button
                className={classnames(css.btnControl, css.btnControlReset)}
                onClick={() => {
                  handleResetClick()
                  handleCloseCalendar()
                }}
              >
                Cancel
              </button>
            </div>
          }
        </div>
      }
    </div>
  )
}

Datepicker.propTypes = {
  className: PropTypes.string
}

export default React.memo(Datepicker)
