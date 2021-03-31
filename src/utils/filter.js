import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils/index'
import { DetailedFilterTypes } from 'utils/const'

export const isDetailedFilterEmpty = (filter) => filter
  .reduce((total, item) => {
    const {value, values} = item

    const isFromExisting = value && value.hasOwnProperty('from') && value.from !== null && !Number.isNaN(+value.from)
    const isToExisting = value && value.hasOwnProperty('to') && value.to !== null && !Number.isNaN(+value.to)

    if (checkIfNonEmptyArray(values) || isFromExisting || isToExisting || (typeof value !== 'object' && value)) {
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
        const isFromExisting = value.hasOwnProperty('from') && value.from !== null && !Number.isNaN(+value.from)
        const isToExisting = value.hasOwnProperty('to') && value.to !== null && !Number.isNaN(+value.to)

        if (value && (isFromExisting || isToExisting)) {
          if (isFromExisting && isToExisting && +value.from === +value.to && +value.from !== +dataItemValue) {
            total = false
          }

          if (isFromExisting && isToExisting && +value.from !== +value.to && (+value.from > +dataItemValue || +value.to < +dataItemValue)) {
            total = false
          }

          if (isFromExisting && !isToExisting && +value.from > +dataItemValue) {
            total = false
          }

          if (!isFromExisting && isToExisting && +value.to < +dataItemValue) {
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

export const getDataOptions = ({data, field, routeData: {detailedList, isRouteType, type}}) => {
  const dataToProcess = isRouteType
    // if filter is type Route we collect data about opposite route point filter
    // (filterTypeToWatch, filterToWatch)
    ? data.filter(item => {
      const filterTypeToWatch = type === DetailedFilterTypes.ROUTE_FROM
        ? DetailedFilterTypes.ROUTE_TO
        : DetailedFilterTypes.ROUTE_FROM

      const filterToWatch = detailedList.find(item => item.type === filterTypeToWatch)

      if (Array.isArray(filterToWatch?.values) && filterToWatch.values.length > 0) {
        return filterToWatch.values.find(value => value === getObjPropertyViaString(item, filterToWatch.field))
      }

      return true
    })
    : data

  const list = dataToProcess.reduce((total, item) => {
    const fieldValue = getObjPropertyViaString(item, field)
    total.push(fieldValue)

    return total
  }, [])

  return [...new Set(list)]
}
