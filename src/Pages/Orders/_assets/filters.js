import { DetailedFilterTypes } from 'utils/const'

export const filterOrders = {
  date: {
    fieldName: 'date',
  },
  detailed: [
    {
      label: 'Payment',
      field: 'payment.value',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Status',
      field: 'orderStatus.key',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Car Type',
      field: 'transportDetails.value',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Places',
      field: 'places.loaded',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Car Number',
      field: 'carNumber.key',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Customer name',
      field: 'clientName',
      type: DetailedFilterTypes.INPUT
    },
  ]
}
