import truckImage from 'assets/images/truck-dummy.jpg'
import license from 'assets/images/license.png'

export const FILTER_OWNERS = [
  {
    label: 'All Cars',
    value: 'all',
    isDefault: true,
  },
  {
    label: 'WINCOM Cars',
    value: 'wincom',
  },
  {
    label: 'Partner Cars',
    value: 'partner',
  },
]

export const FILTER_CATEGORY = [
  {
    label: 'All',
    value: 'all',
    isDefault: true,
  },
  {
    label: 'Economy',
    value: 'economy',
  },
  {
    label: 'Comfort',
    value: 'comfort',
  },
  {
    label: 'Premium',
    value: 'premium',
  },
]

export const FILTER_DELIVERY_STATUS = [
  {
    label: 'All',
    value: 'all',
    isDefault: true,
  },
  {
    label: 'Loaded',
    value: 'loaded',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
  {
    label: 'Unloaded',
    value: 'unloaded',
  },
  {
    label: 'Waiting for Bill',
    value: 'waiting for bill',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
]

export const FILTER_DRIVERS = [
  {
    label: 'All Drivers',
    value: 'all',
    isDefault: true,
  },
  {
    label: 'WINCOM Drivers',
    value: 'wincom',
  },
  {
    label: 'Partner Drivers',
    value: 'partner',
  },
]

export const CAR_INFO_DATA = {
  id: '3415',
  // separate endpoint for images
  img: truckImage,
  isPublished: true,
  // enum
  isPartner: false,
  carNumber: {
    key: 'HU788d',
    value: 'Mercedes'
  },
  type: 'premium',
  places: 1,
  status: 'On road',
  payment: 'Not confirmed',
  freePlaces: 0,
}

export const CAR_PARK_DATA = [
  {
    id: '3415',
    img: truckImage,
    isPublished: true,
    // enum
    isPartner: false,
    carNumber: {
      key: 'HU788d',
      value: 'Mercedes'
    },
    type: 'premium',
    places: 1,
    status: 'On road',
    payment: 'Not confirmed',
    freePlaces: 0,
  },
  {
    id: '3416',
    img: truckImage,
    isPublished: true,
    isPartner: true,
    carNumber: {
      key: 'HU788UK',
      value: 'Mercedes'
    },
    type: 'economy',
    places: 15,
    status: 'Free',
    payment: 'Confirmed',
    freePlaces: 'none',
  },
  {
    id: '3417',
    img: truckImage,
    isPublished: true,
    isPartner: true,
    carNumber: {
      key: 'HU789K',
      value: 'Audi'
    },
    type: 'comfort',
    places: 5,
    status: 'On road',
    payment: 'Not confirmed',
    freePlaces: 'filled',
    info: 'Some additional info about car'
  },
  {
    id: '3418',
    img: truckImage,
    isPublished: false,
    isPartner: false,
    carNumber: {
      key: 'HU7001',
      value: 'Audi'
    },
    type: 'economy',
    places: 15,
    status: 'none',
    payment: 'Confirmed',
    freePlaces: 'none',
  },
  {
    id: '3419',
    img: truckImage,
    isPublished: true,
    isPartner: false,
    carNumber: {
      key: '89djKKd',
      value: 'BMW'
    },
    type: 'economy',
    places: 13,
    status: 'On road',
    payment: 'Not confirmed',
    freePlaces: 5,
  },
]

export const CAR_PARK_COLUMNS = [
  {
    label: '',
    value: 'img',
  },
  {
    label: 'Car ID',
    value: 'id',
  },
  {
    label: 'Published',
    value: 'isPublished',
  },
  {
    label: 'Car Number',
    value: 'carNumber',
  },
  {
    label: 'Type',
    value: 'type',
  },
  {
    label: 'Places',
    value: 'places',
  },
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Free places',
    value: 'freePlaces',
  },
]

export const ORDERS_COLUMNS = [
  {
    label: 'Order ID',
    value: 'id'
  },
  {
    label: 'Date',
    value: 'createdAt'
  },
  {
    label: 'Trusted Client',
    value: 'isTrusted'
  },
  {
    label: 'Payment',
    value: 'payment'
  },
  {
    label: 'Status',
    value: 'orderStatus'
  },
  {
    label: 'Car type',
    value: 'transportDetails'
  },
  {
    label: 'Places',
    value: 'places'
  },
  {
    label: 'Car Number',
    value: 'carNumber'
  },
  {
    label: 'Client ID',
    value: 'clientID'
  },
]

export const ORDERS_DATA = [
  {
    id: '0115',
    // iso format
    createdAt: new Date(2021, 10, 8, 12, 45).getTime(),
    isTrusted: true,
    payment: {
      currency: 'EUR',
      value: 7700,
    },
    // two separate fields
    orderStatus: {
      key: 'delivered',
      value: 'waiting for bill'
    },
    // two seprarate fileds
    transportDetails: {
      key: 'WINCOME',
      value: 'Econom'
    },
    // will require adaptor, array expected
    places: {
      loaded: 3,
      total: 14
    },
    // two seprarate fileds
    carNumber: {
      key: 'HU788UK',
      value: 'Mercedes'
    },
    clientID: '0115'
  },
  {
    id: '0116',
    createdAt: new Date(2021, 10, 8, 12, 45).getTime(),
    isTrusted: false,
    payment: {
      currency: 'EUR',
      value: 105,
    },
    orderStatus: {
      key: 'loaded',
      value: 'waiting for bill'
    },
    transportDetails: {
      key: 'WINCOME',
      value: 'Comfort'
    },
    places: {
      loaded: 1,
    },
    carNumber: {
      key: 'HU788uu',
      value: 'Audi'
    },
    clientID: '0116',
    info: 'Additional info block'
  },
]

export const CUSTOMERS_DATA = [
  {
    customerID: '0115',
    date: new Date(2021, 0, 11).getTime(),
    isTrusted: true,
    ordersTotal: 1110,
    ordersActive: 9,
    email: 'customer1@email.com',
    phone: '+49(0)91815229000',
    name: 'Jim Carrey',
  },
  {
    customerID: '0116',
    date: new Date(2021, 2, 10).getTime(),
    isTrusted: true,
    ordersTotal: 203,
    ordersActive: 4,
    email: 'customer2@email.com',
    phone: '+49(0)91815229000',
    name: 'Angelina Jolie',
  },
  {
    customerID: '0117',
    date: new Date(2021, 5, 9).getTime(),
    isTrusted: false,
    ordersTotal: 307,
    ordersActive: 0,
    email: 'customer3@email.com',
    phone: '+49(0)91815229000',
    name: 'Johnny Depp',
  },
]

export const CUSTOMERS_COLUMNS = [
  {
    label: 'ID',
    value: 'customerID'
  },
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Trusted Client',
    value: 'isTrusted'
  },
  {
    label: 'Orders',
    value: 'ordersTotal'
  },
  {
    label: 'In progress',
    value: 'ordersActive'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Phone',
    value: 'phone'
  },
  {
    label: 'Name',
    value: 'name'
  },
]

export const DRIVERS_DATA = [
  {
    id: '0115',
    name: 'Partner',
    contacts: {
      email: 'customer_899981@email.com',
      phone: '+49 (0) 9181 5229000'
    },
    cars: 1,
    services: ['Comfort'],
    license: license
  },
  {
    id: '0116',
    name: 'WinCom',
    contacts: {
      email: 'customer_111@email.com',
      phone: '+49 (0) 9181 5229000'
    },
    cars: 2,
    services: ['Comfort', 'Premium'],
    license: license
  },
  {
    id: '0117',
    name: 'Jim Carrey',
    contacts: {
      email: 'customer_1@email.com',
      phone: '+49 (0) 9181 5229000'
    },
    cars: 1,
    services: ['Econom'],
    license: license
  },
]

export const DRIVERS_COLUMNS = [
  {
    label: 'ID',
    value: 'id'
  },
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Email/Phone',
    value: 'contacts'
  },
  {
    label: 'Cars',
    value: 'cars'
  },
  {
    label: 'Rides',
    value: 'services'
  },
  {
    label: 'License',
    value: 'license'
  },
]

export const DRIVER_PARK_DATA = [
  {
    id: '3415',
    // ok, but check if it's the best practice? Another option: previews in array and full image
    // is requested on modal component when clicked
    img: [truckImage, truckImage, truckImage],
    isPublished: true,
    // enum
    isPartner: false,
    places: {
      loaded: 3,
      total: 14
    },
    carNumber: {
      key: 'HU788d',
      value: 'Mercedes'
    },
    type: 'premium',
    status: 'On road',
    payment: 'Not confirmed',
    freePlaces: 0,
    // iso date format
    insuranceReminder: '2021-03-02T14:48:00.000Z',
  },
  {
    id: '3416',
    img: [truckImage],
    isPublished: true,
    isPartner: false,
    places: {
      loaded: 14,
      total: 14
    },
    carNumber: {
      key: 'HU788d',
      value: 'Mercedes'
    },
    type: 'premium',
    status: 'On road',
    payment: 'Not confirmed',
    freePlaces: 0,
    insuranceReminder: '2021-03-02T14:48:00.000Z',
  },
]
