import { DetailedFilterTypes } from 'utils/const'

export const filterCarPark = {
  detailed: [
    {
      label: 'Car ID',
      field: 'id',
      type: DetailedFilterTypes.LIST,
      inputPlaceholder: `Search by car id`
    },
    {
      label: 'Published',
      field: 'isPublished',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Car Number',
      field: 'carNumber.key',
      type: DetailedFilterTypes.LIST,
      inputPlaceholder: `Search by number`
    },
    {
      label: 'Type',
      field: 'type',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Free places',
      field: 'freePlaces',
      type: DetailedFilterTypes.RANGE,
      inputPlaceholder: `Search by free places`
    },
  ]
}
