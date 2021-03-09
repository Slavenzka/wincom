import React, { useState } from 'react'
import css from './FilterDetailedItem.module.scss'
import { getObjPropertyViaString } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDetailedFilteredValues } from 'store/actions'

const FilterDetailedItem = ({
  label,
  field,
  type,
}) => {
  const [isOpen, setOpenStatus] = useState(false)
  const secondaryFilteredData = useSelector(store => store.filter.secondaryFilteredData) || []
  const detailedFilter = useSelector(store => store.filter.detailedFilter)
  const dispatch = useDispatch()

  const getDataOptions = field => secondaryFilteredData.reduce((total, item) => {
    total.push(getObjPropertyViaString(item, field))
    return total
  }, [])

  const renderOption = ({item, field, type, index}) => {
    switch (type) {
      default:
        const itemID = `${field}.${index}`

        const handleClickOption = (field, type, value) => {
          dispatch(setDetailedFilteredValues({
            field,
            type,
            values: value
          }))
        }

        const isChecked = !!detailedFilter
          .find(filter => filter?.values && Array.isArray(filter.values) && filter.values.length > 0 && filter.values.indexOf(item) >= 0)

        return (
          <>
            <label htmlFor={field} className={css.label}>
              { item }
            </label>
            <input
              type='checkbox'
              id={itemID}
              name={itemID}
              checked={isChecked}
              onChange={() => handleClickOption(field, type, item)}
            />
          </>
        )
    }
  }

  const renderOptionsList = (field, type) => {
    const list = getDataOptions(field)

    const items = list.map((item, index) => {
      return (
        <li className={css.subitem} key={index}>
          { renderOption({item, field, type, index}) }
        </li>
      )
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
