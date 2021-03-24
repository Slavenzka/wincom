import { DetailedFilterTypes } from 'utils/const'

export const filterOrders = {
  date: {
    fieldName: 'date',
  },
  detailed: [
    {
      label: 'Route',
      field: 'route',
      type: DetailedFilterTypes.LIST
    },
    {
      label: 'Price',
      field: 'payment.value',
      type: DetailedFilterTypes.RANGE,
      currencySymbol: `&euro;`
    },
    {
      label: 'Status',
      field: 'orderStatus',
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
      label: 'Payment',
      field: 'paymentStatus',
      type: DetailedFilterTypes.LIST,
    },
  ]
}
