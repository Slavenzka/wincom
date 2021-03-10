import { DetailedFilterTypes } from 'utils/const'

export const filterCustomers = {
  detailed: [
    {
      label: 'Trusted Client',
      field: 'isTrusted',
      type: DetailedFilterTypes.LIST,
    },
    {
      label: 'Orders Total',
      field: 'ordersTotal',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Orders Active',
      field: 'ordersActive',
      type: DetailedFilterTypes.RANGE,
    },
    {
      label: 'Name',
      field: 'name',
      type: DetailedFilterTypes.INPUT,
    },
  ]
}
