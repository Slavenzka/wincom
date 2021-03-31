import { CurrencySymbols, OrderStatuses } from 'utils/const'

export const debounce = func => {
  let lastTimeout = null

  return function () {
    const context = this
    const args = arguments

    if (lastTimeout) {
      clearTimeout(lastTimeout)
    }

    lastTimeout = setTimeout(function () {
      func.apply(context, args)
    }, 250)
  }
}

export const updateObject = (object, field) => Object.assign({}, object, field)

export const formatNumbers = (value, digits = 2) => {
  if (value > 999) {
    return String(+value.toFixed(digits)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ')
  }

  return value
}

export const addZeroToSingleDigit = value => !Number.isNaN(+value) && +value < 10
  ? `0${value}`
  : value

export const getDateComponents = dateObj => {
  if (!dateObj) return {}

  const day = addZeroToSingleDigit(dateObj.getDate())
  const month = addZeroToSingleDigit(dateObj.getMonth() + 1)
  const year = dateObj.getFullYear()
  const hours = addZeroToSingleDigit(dateObj.getHours())
  const minutes = addZeroToSingleDigit(dateObj.getMinutes())

  return {
    year,
    month,
    day,
    hours,
    minutes
  }
}

export const scrollToElement = (el, offset = 0) => {
  const targetOffset = el.getBoundingClientRect().top + window.scrollY

  window.scrollTo({
    top: targetOffset + offset,
    behavior: 'smooth'
  })
}

export const getStatus = status => Object.keys(OrderStatuses).reduce((total, item) => {
  if (!total && OrderStatuses[item].values.findIndex(el => el.toUpperCase() === status.toUpperCase()) >= 0) {
    total = item
    return total
  }
  return total
}, null)

export const getCurrencySymbol = currencyName => CurrencySymbols[currencyName || CurrencySymbols.USD]

export const isEmailValid = value => {
  const valueArray = value.split('')
  const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,12}$/

  return valueArray.length > 0
    ? valueArray.length >= 8 &&
    valueArray.length < 50 &&
    // в строке есть символ @
    valueArray.indexOf('@') !== -1 &&
    // в строке всего один символ @
    valueArray.indexOf('@') === valueArray.lastIndexOf('@') &&
    // в строке символ @ расположен так, что перед ним как минимум 2 символа
    valueArray.indexOf('@') > 1 &&
    // в строке символ @ расположен так, что после него как минимум 4 символов, например ab.ua
    valueArray.indexOf('@') < value.length - 4 &&
    // в строке есть точка
    valueArray.indexOf('.') !== -1 &&
    // в строке точка не первая
    valueArray.indexOf('.') > 0 &&
    // в строке последняя точка расположен так, что после нее как минимум 2 символа, например .ua
    valueArray.lastIndexOf('.') < value.length - 1 &&
    // в строке последняя точка находится раньше @
    valueArray.lastIndexOf('.') > valueArray.lastIndexOf('@') &&
    // в строке нет двух точек подряд
    value.indexOf('..') === -1 &&
    regexp.test(value)
    : true
}

export const validateName = () => ({
  required: true,
  validate: value => {
    return (`${value}`.length <= 50 && `${value}`.length >= 3) || `Пожалуйста, введите имя от 3 до 50 символов`
  },
  pattern: {
    value: /^[A-Za-zА-Яа-яёЁ\s']+$/,
    message: 'Имя может содержать лишь буквы латинского или кириллического алфавитов',
  },
})

export const validateEmail = () => ({
  validate: value => isEmailValid(value) || 'Проверьте правильность введенного адреса'
})

export const validatePhone = () => ({
  validate: {
    isPhone: value => {
      const purifiedString = `${value}`.split(' ').join('')
      return purifiedString === '' ||
        (!Number.isNaN(+purifiedString) && purifiedString.length >= 9 && purifiedString.length <= 20) ||
        `Проверьте корректность введенного номера телефона и убедитесь, что он не короче 9 и не длиннее 20 символов`
    }
  }
})

export const getObjPropertyViaString = (object = {}, string) => {
  const stringArray = string.split('.')

  return stringArray.reduce((total, item) => {
    total = total[item]
    return total
  }, object)
}

export const checkIfNonEmptyArray = value => value && Array.isArray(value) && value.length > 0
export const checkIfNumber = value => value !== null && value !== undefined && value !== '' && !Number.isNaN(+value)

export const getDetailedItemLabel = ({value, values}) => {
  if (checkIfNonEmptyArray(values)) {
    return `${values.length} selected`
  }

  if (value && value.hasOwnProperty('from') && value.hasOwnProperty('to')) {
    const isFromExists = checkIfNumber(value?.from)
    const isToExists = checkIfNumber(value?.to)

    if (isFromExists && !isToExists) {
      return `From ${value.from}`
    }

    if (!isFromExists && isToExists) {
      return `To ${value.to}`
    }

    if (isFromExists && isToExists) {
      return `From ${value.from} to ${value.to}`
    }
  }
}

export const checkIfDetailedListTouched = (detailedFilter = []) => {
  return detailedFilter
    .filter(({values}) => Array.isArray(values) && values.length > 0)
    .length > 0
}

export const getYearOptions = (startYear, qty) => new Array(qty)
  .fill('')
  .map((_, index) => startYear + index)
