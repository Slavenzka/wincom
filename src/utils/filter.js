import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils/index'

export const isDetailedFilterEmpty = (filter) => filter
  .reduce((total, item) => {
    const {value, values} = item

    if (checkIfNonEmptyArray(values) || value?.from || value?.to || (typeof value !== 'object' && value)) {
      total.push(item)
    }

    return total
  }, [])
  .length === 0


const checkItemFiltrationForList = (dataItem, filter) => {
  return filter.reduce((total, {field, values}) => {
    const dataItemValue = getObjPropertyViaString(dataItem, field)

    if (checkIfNonEmptyArray(values) && values.indexOf(dataItemValue) < 0) {
      total = false
    }

    return total
  }, true)
}

export const getDetailedFilteredData = (raw, filter) => {
  return raw.filter(item => checkItemFiltrationForList(item, filter))
}
