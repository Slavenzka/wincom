import { DetailedFilterTypes } from 'utils/const'

export const filterDrivers = {
  detailed: [
    {
      label: 'Name',
      field: 'name',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Cars',
      field: 'cars.value',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Rides',
      field: 'services',
      type: DetailedFilterTypes.LIST,
    },
  ]
}
