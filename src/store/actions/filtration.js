import {
  RESET_FILTERS, SET_DATE_FILTER_VALUE, SET_DETAILED_FILTER,
  SET_FILTERED_DATA,
  SET_PRIMARY_FILTER_VALUE, SET_SECONDARY_FILTER_DATA,
  SET_SECONDARY_FILTER_VALUE,
} from 'store/actions/actionTypes'
import { checkIfNonEmptyArray, getObjPropertyViaString } from 'utils'
import { DetailedFilterTypes } from 'utils/const'
import { getDetailedFilteredData, isDetailedFilterEmpty } from 'utils/filter'

export const setDateFilterValue = ({from, to}) => ({
  type: SET_DATE_FILTER_VALUE,
  payload: {
    from,
    to
  }
})

export const setPrimaryFilterValue = value => ({
  type: SET_PRIMARY_FILTER_VALUE,
  payload: value
})

export const setSecondaryFilterValue = value => ({
  type: SET_SECONDARY_FILTER_VALUE,
  payload: value
})

export const setFilteredData = data => ({
  type: SET_FILTERED_DATA,
  payload: data
})

export const setSecondaryFilteredData = data => ({
  type: SET_SECONDARY_FILTER_DATA,
  payload: data
})

export const setDetailedFilteredValues = ({field, type, values}) => {
  return (dispatch, getState) => {
    const detailedFilter = JSON.parse(JSON.stringify(getState().filter.detailedFilter))
    const indexToModify = detailedFilter.findIndex(item => item.field === field)

    if (type === DetailedFilterTypes.LIST) {
      const existingValues = detailedFilter[indexToModify].values
      const existingIndex = existingValues.findIndex(item => item === values)

      if (existingIndex < 0) {
        existingValues.push(values)
      }

      if (existingIndex >= 0) {
        detailedFilter[indexToModify].values = [].concat(existingValues.slice(0, existingIndex), existingValues.slice(existingIndex + 1))
      }
    } else {
      detailedFilter[indexToModify].value = values
    }

    dispatch({
      type: SET_DETAILED_FILTER,
      payload: detailedFilter
    })
  }
}

export const resetFilters = ({primaryList, secondaryList, detailedList}) => {
  return dispatch => {
    const defaultPrimary = primaryList
      ? primaryList.find(item => item.isDefault)
      : null

    const defaultSecondary = secondaryList
      ? secondaryList.find(item => item.isDefault)
      : null

    const defaultDetailed = detailedList.map(item => {
      switch (item.type) {
        case DetailedFilterTypes.INPUT:
          return {
            ...item,
            value: null
          }
        case DetailedFilterTypes.RANGE:
          return {
            ...item,
            value: {
              from: null,
              to: null,
            }
          }
        default:
          return {
            ...item,
            values: []
          }
      }
    })

    dispatch({
      type: RESET_FILTERS,
      payload: {
        activePrimary: defaultPrimary,
        activeSecondary: defaultSecondary,
        detailedFilter: defaultDetailed
      }
    })
  }
}

export const applyFiltration = ({rawData, filter = {}}) => {
  return (dispatch, getState) => {
    const filterState = getState().filter
    const activePrimary = filterState.activePrimary
    const activeSecondary = filterState.activeSecondary
    const activeDate = filterState.activeDate
    const activeDetailed = filterState.detailedFilter
    const {primary, secondary, detailed, date} = filter

    const isNoDateFilterApplied = !activeDate || (!activeDate?.from && !activeDate.to)
    const isNoFilterApplied = !activePrimary && !activeSecondary && isNoDateFilterApplied && isDetailedFilterEmpty(activeDetailed)
    const isDetailedFilterRequired = detailed && Array.isArray(detailed) && detailed.length > 0

    const dateFilter = date && activeDate?.from
      ? rawData.filter(item => {
        if (typeof item[date.fieldName] === 'object' && item[date.fieldName].from && item[date.fieldName].to) {

          return (item[date.fieldName].from >= activeDate.from.getTime() && item[date.fieldName].to <= activeDate.to.getTime()) ||
            (item[date.fieldName].from >= activeDate.from.getTime()) ||
            (item[date.fieldName].from <= activeDate.to.getTime())
        }

        return activeDate?.to
          ? item[date.fieldName] >= activeDate.from.getTime() && item[date.fieldName] <= activeDate.to.getTime()
          : item[date.fieldName] >= activeDate.from.getTime()
      })
      : rawData

    const primaryFiltered = activePrimary && primary
      ? dateFilter.filter(item => activePrimary.values.length === 0 ||  activePrimary.values.indexOf(item[primary.field].toUpperCase()) >= 0)
      : dateFilter

    const secondaryFiltered = activeSecondary && secondary
      ? primaryFiltered
        .filter(item => {
          if (!activeSecondary) return true

          const itemValue = getObjPropertyViaString(item, secondary.field)
          return activeSecondary.values.length === 0 || activeSecondary.values.indexOf(itemValue.toUpperCase()) >= 0
        })
      : primaryFiltered

    const detailedFiltered = checkIfNonEmptyArray(detailed)
      ? getDetailedFilteredData(secondaryFiltered, activeDetailed)
      : secondaryFiltered

    if (isNoFilterApplied) {
      dispatch(setFilteredData(rawData))
      isDetailedFilterRequired && dispatch(setSecondaryFilteredData(rawData))
    } else {
      dispatch(setFilteredData(detailedFiltered))
      isDetailedFilterRequired && dispatch(setSecondaryFilteredData(secondaryFiltered))
    }
  }
}
