import { DetailedFilterTypes } from 'utils/const'

export const filterOrders = {
  date: {
    fieldName: 'date',
  },
  detailed: [
    {
      label: 'Route From',
      field: 'route.from',
      type: DetailedFilterTypes.ROUTE_FROM
    },
    {
      label: 'Route To',
      field: 'route.to',
      type: DetailedFilterTypes.ROUTE_TO
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
      placeholder: `Enter status name`
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
