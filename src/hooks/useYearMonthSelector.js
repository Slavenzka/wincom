import React from 'react'
import css from 'styles/yearMonthSelector.module.scss'
import DropdownList from 'components/DropdownList/DropdownList'
import { getYearOptions } from 'utils'

const useYearMonthSelector = ({
  localization,
  calendarState,
  updateCalendarState,
}) => {
  const actualYear = new Date().getFullYear()
  const fromMonth = new Date(actualYear - 9, calendarState?.from ? calendarState.from.getMonth() : new Date().getMonth())
  const toMonth = new Date(actualYear + 1, 11)

  const monthOptions = localization.months

  // const yearOptions = [];
  // for (let i = fromMonth.getFullYear() - 1; i <= toMonth.getFullYear(); i += 1) {
  //   years.push(i);
  // }

  const yearOptions = getYearOptions(fromMonth.getFullYear(), toMonth.getFullYear() - fromMonth.getFullYear() + 1)

  const handleYearMonthChange = month => {
    updateCalendarState(prevState => {
      const selectedYear = month.getFullYear()
      const selectedMonth = month.getMonth()

      return {
        ...prevState,
        from: new Date(selectedYear, selectedMonth, calendarState?.from ? calendarState.from.getDate() : null),
        to: new Date(selectedYear, selectedMonth, calendarState?.to ? calendarState.to.getDate() : null),
        month,
      }
    })
  }

  const getSelectedMonth = date => localization.months[date.getMonth()]
  const getSelectedYear = date => date.getFullYear()

  const handleChange = function handleChange(date, value) {
    const updatedObject = {
      year: date.getFullYear(),
      month: localization.months[date.getMonth()],
      ...value
    }
    const { year, month } = updatedObject
    handleYearMonthChange(new Date(year, localization.months.findIndex(item => item === month)));
  }

  return date => (
    <div className={'DayPicker-Caption'}>
      <div className={css.selectWrapper}>
        <DropdownList
          className={css.dropdown}
          label={getSelectedMonth(date)}
          list={monthOptions}
          onChange={month => handleChange(date, {
            month
          })}
        />
        <DropdownList
          className={css.dropdown}
          label={getSelectedYear(date)}
          list={yearOptions}
          onChange={year => handleChange(date, {
            year
          })}
          isLargerFont
        />
      </div>
    </div>
  )

}

export default useYearMonthSelector
