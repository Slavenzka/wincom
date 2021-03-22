import React, { useEffect, useState, useRef } from 'react'
import css from './DropdownList.module.scss'
import classnames from 'classnames'

const DropdownList = ({
  label,
  list,
  onChange
}) => {
  const [isOpen, setOpenStatus] = useState(false)

  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const isUnmounted = useRef(false)

  const renderListItems = () => list.map((item, index) => {
    return (
      <li key={index}>
        <button
          className={classnames(css.buttonSelect, {
            [css.buttonSelectActive]: label.toUpperCase() === item.toUpperCase()
          })}
          onClick={() => onChange(item)}
          type={ `button` }
        >
          { item }
        </button>
      </li>
    )
  })

  const handleClickOutside = evt => {
    const isClickedOutside = listRef.current && buttonRef.current && evt.target !== buttonRef.current && !listRef.current.contains(evt.target)

    if (!isUnmounted.current && isClickedOutside) {
      setOpenStatus(false)
    }
  }

  useEffect(() => {
    if (isOpen && buttonRef.current && listRef.current) {
      isUnmounted.current = false
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      isUnmounted.current = true
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <button
        className={classnames(css.buttonVisibility, {
          [css.buttonVisibilityOpen]: isOpen
        })}
        type={ `button` }
        onClick={() => setOpenStatus(state => !state)}
        ref={buttonRef}
      >
        { label }
      </button>
      {isOpen &&
        <ul className={css.list} ref={listRef}>
          { renderListItems() }
        </ul>
      }
    </>
  )
}

export default DropdownList
