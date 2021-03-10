import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils/index'
import { DetailedFilterTypes } from 'utils/const'

export const isDetailedFilterEmpty = (filter) => filter
  .reduce((total, item) => {
    const {value, values} = item

    if (checkIfNonEmptyArray(values) || value?.from || value?.to || (typeof value !== 'object' && value)) {
      total.push(item)
    }

    return total
  }, [])
  .length === 0


const checkItemFiltrationStatus = (dataItem, filter) => {
  return filter.reduce((total, {field, type, values, value}) => {
    const dataItemValue = getObjPropertyViaString(dataItem, field)

    switch (type) {
      case DetailedFilterTypes.RANGE:
        if (value && ((value?.from && !Number.isNaN(+value?.from)) || (value?.to && !Number.isNaN(+value?.to)))) {
          if (value?.from && value?.to && +value?.from === +value?.to && +value?.from !== +dataItemValue) {
            total = false
          }

          if (value?.from && value?.to && +value?.from !== +value?.to && (+value?.from > +dataItemValue || +value?.to < +dataItemValue)) {
            total = false
          }

          if (value?.from && !value?.to && +value?.from > +dataItemValue) {
            total = false
          }

          if (!value?.from && value?.to && +value?.to < +dataItemValue) {
            total = false
          }
        }
        break
      case DetailedFilterTypes.INPUT:
        if (!!value && `${dataItemValue}`.toUpperCase().indexOf(value.toUpperCase()) < 0) {
          total = false
        }
        break
      default:
        if (checkIfNonEmptyArray(values) && values.indexOf(dataItemValue) < 0) {
          total = false
        }
    }

    return total
  }, true)
}

export const getDetailedFilteredData = (raw, filter) => {
  return raw.filter(item => checkItemFiltrationStatus(item, filter))
}
