import React from 'react'
import css from 'styles/yearMonthSelector.module.scss'
import DropdownList from 'components/DropdownList/DropdownList'

const useYearMonthSelector = ({
  localization,
  calendarState,
  updateCalendarState,
}) => {
  const fromMonth = new Date(2021, calendarState?.from ? calendarState.from.getMonth() : new Date().getMonth())
  const toMonth = new Date(2021 + 10, 11)

  const monthOptions = localization.months

  const years = [];
  for (let i = fromMonth.getFullYear() - 1; i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const yearOptions = years.map(item => ({
    label: item,
    value: item
  }))

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
          label={getSelectedMonth(date)}
          list={monthOptions}
          onChange={month => handleChange(date, {
            month
          })}
        />
        {/*<SelectDropdown*/}
        {/*  className={classnames(css.select, css.selectMonth)}*/}
        {/*  onChange={evt => handleChange(date,{*/}
        {/*    month: evt*/}
        {/*  })}*/}
        {/*  value={{*/}
        {/*    label: localization.months[date.getMonth()],*/}
        {/*    value: localization.months[date.getMonth()],*/}
        {/*  }}*/}
        {/*  options={monthOptions}*/}
        {/*  dropdownComponent={<span className={css.arrow} />}*/}
        {/*/>*/}
        {/*<SelectDropdown*/}
        {/*  className={classnames(css.select, css.selectYear)}*/}
        {/*  onChange={evt => handleChange({*/}
        {/*    year: evt*/}
        {/*  })}*/}
        {/*  value={{*/}
        {/*    label: date.getFullYear(),*/}
        {/*    value: date.getFullYear()*/}
        {/*  }}*/}
        {/*  options={yearOptions}*/}
        {/*  dropdownComponent={<span className={css.arrow} />}*/}
        {/*/>*/}
      </div>
    </div>
  )

}

export default useYearMonthSelector
