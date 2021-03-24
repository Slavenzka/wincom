import React, { useEffect, useState } from 'react'
import css from './SelectDropdown.module.scss'
import Select, { components } from 'react-select'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import classnames from 'classnames'

const SelectDropdown = ({
  className,
  classNameSelect,
  onChange,
  onChangeControlled,
  value,
  options,
  id,
  defaultValue,
  label = '',
  isError,
  isRequired,
  isLoading,
  isDisabled,
  placeholder = 'Select',
  dropdownComponent,
  noOptionsLabel = 'No options',
  blockAgainstLabel,
  ...restProps
}) => {
  const [selectOptions, updateSelectOptions] = useState(options)

  useEffect(() => {
    const updatedOptions = options
      ? options.filter(item => item.value !== value?.value)
      : []
    updateSelectOptions(updatedOptions)
  }, [value, options])

  // You need react-select@3.0.4 to make it "see" simplebar. Does not work on newer versions of
  // react-select
  const renderScrollbar = props => {
    return (
      <div>
        <SimpleBar style={{ maxHeight: '15rem' }} autoHide={false}>
          {props.children}
        </SimpleBar>
      </div>
    )
  }

  const colourStyles = {
    control: (styles, { selectProps, isFocused }) => ({
      ...styles,
      borderColor: selectProps.menuIsOpen || isFocused ? 'rgb(121, 121, 121)' : 'rgb(195, 195, 195)',
      borderRadius: '0.2rem',
      // borderBottomRightRadius: selectProps.menuIsOpen ? 0 : '0.2rem',
      // borderBottomLeftRadius: selectProps.menuIsOpen ? 0 : '0.2rem',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    }),
    dropdownIndicator: (styles, { selectProps }) => {
      return {
        ...styles,
        transition: 'all 0.3s',
        transform: `rotate(${selectProps.menuIsOpen ? 180 : 0}deg)`,
      }
    },
    option: styles => ({
      ...styles,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 2rem',
      height: '5rem',
    }),
  }

  return (
    <div className={classnames(css.wrapper, className)} id={id}>
      {label &&
        <p className={css.label}>
          {label}
        </p>
      }
      { blockAgainstLabel }
      <Select
        options={selectOptions}
        className={classnames(css.select, classNameSelect, {
          [css.selectError]: isError,
          [css.selectLoading]: isLoading,
          [css.selectDisabled]: isDisabled,
        })}
        classNamePrefix='select'
        components={{
          MenuList: renderScrollbar,
          DropdownIndicator: dropdownComponent
            ? props => <components.DropdownIndicator {...props}>{ dropdownComponent }</components.DropdownIndicator>
            : components.DropdownIndicator
        }}
        styles={colourStyles}
        placeholder={placeholder}
        onChange={evt => {
          onChange(evt)
          onChangeControlled && onChangeControlled(evt)
        }}
        value={value}
        noOptionsMessage={() => noOptionsLabel}
        {...restProps}
      />
    </div>
  )
}

export default SelectDropdown
