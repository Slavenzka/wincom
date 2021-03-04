export const DeviceTypes = {
  DESKTOP: 'desktop',
  ADAPTIVE: 'adaptive'
}

export const ContainerPaddings = {
  BOTH: 'BOTH',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

export const ButtonPalettes = {
  FILLED: 'FILLED',
  BORDERED: 'BORDERED'
}

export const ButtonHeights = {
  REGULAR: 'REGULAR',
  LARGE: 'LARGE',
  SMALL: 'SMALL'
}

export const HeadingTypes = {
  H2: 'h2',
  H3: 'h3'
}

export const TABLE_ROW_HEIGHT = 140
export const TABLE_ROW_HEIGHT_MEDIUM = 97

export const TableCellTypes = {
  IMG: {
    values: ['img'],
    type: 'image'
  },
  ID: {
    values: ['id'],
    type: 'id'
  },
  KEY_VALUE: {
    values: ['carNumber', 'transportDetails'],
    type: 'pair'
  },
  STATUS: {
    values: ['isPublished'],
    type: 'switch'
  },
  DATE_AND_TIME: {
    values: ['createdAt'],
    type: 'dateAndTime'
  },
  DATE: {
    values: ['date'],
    type: 'date'
  },
  PRICE: {
    values: ['payment'],
    type: 'funds'
  },
  DELIVERY_STATUS: {
    values: ['orderStatus'],
    type: 'deliveryStatus'
  },
  CLIENT_STATUS: {
    values: ['isTrusted'],
    type: 'clientStatus'
  },
  PLACES: {
    values: ['places'],
    type: 'cargo'
  },
  ORDERS_TOTAL: {
    values: ['ordersTotal'],
    type: 'ordersTotal'
  },
  ORDERS_ACTIVE: {
    values: ['ordersActive'],
    type: 'ordersActive'
  },
  CONTACTS: {
    values: ['contacts'],
    type: 'contacts'
  },
  PREVIEW: {
    values: ['license'],
    type: 'license'
  },
  LINK: {
    values: ['cars'],
    type: 'link'
  }
}

export const VehicleOwners = {
  PARTNER: 'Partner',
  WINCOM: 'WINCOM',
}

export const SERVICE_TYPES_OPTIONS = [
  {
    label: 'Economy',
    value: 'Economy',
  },
  {
    label: 'Comfort',
    value: 'Comfort',
  },
  {
    label: 'Premium',
    value: 'Premium',
  },
]

export const ACCEPTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif']
export const NO_ROUTING_TAGS = ['LABEL', 'INPUT']

export const CurrencySymbols = {
  EUR: `&euro;`,
  USD: `$`
}

export const OrderStatuses = {
  PENDING: {
    values: [`delivered`],
    class: `pending`
  },
  FINISHED: {
    values: [`unloaded`],
    class: `success`
  },
  STARTED: {
    values: [`loaded`],
    class: `warning`
  }
}

export const PaymentStatuses = {
  WAITING_FOR_BILL: {
    values: ['waiting for bill'],
    color: 'rgb(236, 140, 29)'
  }
}

export const CarOrderTypes = [
  {
    label: 'Automatic',
    value: 'automatic'
  },
  {
    label: 'Confirmation',
    value: 'confirmation'
  },
]
