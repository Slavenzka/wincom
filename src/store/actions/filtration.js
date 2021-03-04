import {
  RESET_FILTERS,
  SET_CATEGORY_FILTER_VALUE, SET_DRIVERS_FILTER_VALUE,
  SET_OWNER_FILTER_VALUE, SET_STATUS_FILTER_VALUE
} from 'store/actions/actionTypes'
import { FILTER_CATEGORY, FILTER_DELIVERY_STATUS, FILTER_DRIVERS, FILTER_OWNERS } from 'utils/data'

export const setOwnerFilterValue = value => ({
  type: SET_OWNER_FILTER_VALUE,
  payload: value
})

export const setCategoryFilterValue = value => ({
  type: SET_CATEGORY_FILTER_VALUE,
  payload: value
})

export const setStatusFilterValue = value => ({
  type: SET_STATUS_FILTER_VALUE,
  payload: value
})

export const setDriversFilterValue = value => ({
  type: SET_DRIVERS_FILTER_VALUE,
  payload: value
})

export const resetFilters = () => {
  return dispatch => {
    const defaultOwner = FILTER_OWNERS.find(item => item.isDefault)
    const defaultCategory = FILTER_CATEGORY.find(item => item.isDefault)
    const defaultStatus = FILTER_DELIVERY_STATUS.find(item => item.isDefault)
    const defaultDrivers = FILTER_DRIVERS.find(item => item.isDefault)

    dispatch({
      type: RESET_FILTERS,
      payload: {
        activeOwner: defaultOwner,
        activeCategory: defaultCategory,
        activeStatus: defaultStatus,
        activeDrivers: defaultDrivers,
      }
    })
  }
}
