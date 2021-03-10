import { DetailedFilterTypes } from 'utils/const'

export const filterDrivers = {
  detailed: [
    {
      label: 'Name',
      field: 'name',
      type: DetailedFilterTypes.INPUT,
    },
    {
      label: 'Cars',
      field: 'cars',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Rides',
      field: 'services',
      type: DetailedFilterTypes.INPUT,
    },
  ]
}
