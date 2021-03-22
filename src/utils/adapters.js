export const carParkAdapter = data => {
  const adaptDataItem = ({
    id,
    licencePlate,
    model,
    approved,
    towTruckOwner,
    status,
    carriageType,
    carPlaces,
    freeCarPlaces,
    vehicleThumbnail,
  }) => ({
    id,
    img: vehicleThumbnail.image,
    imgType: vehicleThumbnail.photoType,
    isPublished: approved,
    owner: towTruckOwner,
    carNumber: {
      key: licencePlate,
      value: model,
    },
    type: carriageType,
    places: carPlaces,
    status,
    freePlaces: freeCarPlaces,
  })

  return Array.isArray(data)
    ? data.map(adaptDataItem)
    : adaptDataItem(data)
}

export const customersAdapter = data => {
  return data.map(({
    id,
    registerDate,
    trusted,
    totalOrdersAmount,
    inProgressOrdersAmount,
    email,
    phone,
    customerName,
  }) => {
    return {
      customerID: id,
      date: new Date(registerDate).getTime(),
      isTrusted: trusted,
      ordersTotal: totalOrdersAmount,
      ordersActive: inProgressOrdersAmount,
      email,
      phone,
      name: customerName,
    }
  })
}

export const carriersAdapter = data => {
  return data.map(({
    id,
    name,
    email,
    phone,
    carsQuantity,
    carriageTypes,
    licenceThumbnail,
  }) => {
    return {
      id,
      name,
      contacts: {
        email: 'test@test.test',
        phone: phone
      },
      cars: '0',
      services: ['testService'],
      license: {
        ...licenceThumbnail,
        fullImageUrl: `/api/user/carrier/${id}/searchFullPhoto/LICENCE`
      },
    }
  })
}

export const ordersAdapter = data => {
  const adaptOrderItem = ({
    id,
    deliveryFromDate,
    deliveryToDate,
    trustedClient,
    currency,
    amount,
    status,
    paymentStatus,
  }) => ({
    id,
    date: {
      from: new Date(deliveryFromDate).getTime(),
      to: new Date(deliveryToDate).getTime(),
    },
    isTrusted: trustedClient,
    payment: {
      currency,
      value: amount,
    },
    orderStatus: {
      key: 'loaded',
      value: 'waiting for bill'
    },
    transportDetails: {
      key: 'WINCOM',
      value: 'Comfort'
    },
    places: {
      loaded: 1,
    },
    carNumber: {
      key: 'HU788uu',
      value: 'Audi'
    },
    clientName: 'Old McFarth',
    info: 'Additional info block'
  })

  return Array.isArray(data)
    ? data.map(adaptOrderItem)
    : adaptOrderItem(data)
}
