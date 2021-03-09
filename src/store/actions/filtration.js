import {
  RESET_FILTERS, SET_DATE_FILTER_VALUE,
  SET_FILTERED_DATA,
  SET_PRIMARY_FILTER_VALUE,
  SET_SECONDARY_FILTER_VALUE,
} from 'store/actions/actionTypes'
import { getObjPropertyViaString } from 'utils'

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

export const resetFilters = ({primaryList, secondaryList}) => {
  return dispatch => {
    const defaultPrimary = primaryList
      ? primaryList.find(item => item.isDefault)
      : null
    const defaultSecondary = secondaryList
      ? secondaryList.find(item => item.isDefault)
      : null

    dispatch({
      type: RESET_FILTERS,
      payload: {
        activePrimary: defaultPrimary,
        activeSecondary: defaultSecondary,
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
    const {primary, secondary, date} = filter

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

    const isNoDateFilterApplied = !activeDate || (!activeDate?.from && !activeDate.to)
    const isNoFilterApplied = !activePrimary && !activeSecondary && isNoDateFilterApplied

    if (isNoFilterApplied) {
      dispatch(setFilteredData(rawData))
    } else {
      dispatch(setFilteredData(secondaryFiltered))
    }
  }
}
