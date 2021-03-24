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
    registerDate,
    trusted,
    totalOrdersAmount,
    inProgressOrdersAmount,
    email,
    phone,
    customerName,
  }) => {
    return {
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
    from,
    to,
    createdAt,
    deliveryFromDate,
    deliveryToDate,
    currency,
    amount,
    status,
    carriageType,
    companyName,
    paymentStatus,
    capacity,
    loaded
  }) => ({
    id,
    dateRange: {
      from: new Date(deliveryFromDate).getTime(),
      to: new Date(deliveryToDate).getTime(),
    },
    route: {
      from,
      to,
    },
    orderDate: createdAt,
    payment: {
      currency,
      value: amount,
    },
    orderStatus: status,
    transportDetails: {
      key: companyName,
      value: carriageType
    },
    places: {
      loaded,
      total: capacity,
    },
    paymentStatus
  })

  return Array.isArray(data)
    ? data.map(adaptOrderItem)
    : adaptOrderItem(data)
}
