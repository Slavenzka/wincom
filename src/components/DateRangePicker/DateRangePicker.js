import React, { useState, useCallback, useRef, useEffect } from 'react'
import css from './DateRangePicker.module.scss'
import classnames from 'classnames'
import Datepicker from 'components/Datepicker/Datepicker'
import { getDateComponents } from 'utils'
import IconCalendarSimplified from 'assets/icons/IconCalendarSimplified'
import Button from 'components/Button/Button'
import { ButtonHeights, ButtonPalettes } from 'utils/const'
import { useDispatch } from 'react-redux'
import { setDateFilterValue } from 'store/actions/filtration'

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
  const bgRef = useRef(null)
  const dispatch = useDispatch()

  const handleClickCancel = () => {
    setResetRef(prevState => prevState + 1)
    setRange(INITIAL_STATE)

    dispatch(setDateFilterValue({
      from: INITIAL_STATE.from,
      to: INITIAL_STATE.to
    }))

    setOpenStatus(false)
  }

  const handleClickOutside = () => {
    setOpenStatus(false)
  }

  const handleClickApply = () => {
    setRange(prevState => {
      return {
        ...prevState,
        selected: {
          from: prevState.from,
          to: prevState.to
        }
      }
    })

    setOpenStatus(false)
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

  useEffect(() => {
    const backgroundNode = bgRef.current

    if (backgroundNode && isOpen) {
      backgroundNode.addEventListener('click', handleClickOutside)
    }

    return () => {
      if (backgroundNode) {
        backgroundNode.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isOpen])

  useEffect(() => {
    dispatch(setDateFilterValue({
      from: range.selected.from,
      to: range.selected.to
    }))
  }, [range.selected])

  return (
    <>
      {isOpen &&
        <div className={css.background} ref={bgRef} />
      }
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
            className={css.dateWrapper}
            contentClassName={css.date}
            onDateSelect={handleSelectStartDate}
            externalResetRef={resetRef}
            isCalendarAlwaysOpen
            isSelectedOnDayClick
            isRangeStyle
          />
          <Datepicker
            className={css.dateWrapper}
            contentClassName={css.date}
            onDateSelect={handleSelectEndDate}
            externalResetRef={resetRef}
            isCalendarAlwaysOpen
            isSelectedOnDayClick
            isRangeStyle
          />
          <div className={css.controls}>
            <Button
              className={css.button}
              palette={ButtonPalettes.BORDERED}
              height={ButtonHeights.SMALL}
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
            <Button
              className={css.button}
              height={ButtonHeights.SMALL}
              onClick={handleClickApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DateRangePicker
