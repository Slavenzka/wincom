export const carParkAdapter = data => {
  const adaptDataItem = ({
    id,
    licencePlate,
    model,
    approved,
    towTruckOwner,
    status,
    carType,
    carPlaces,
    freeCarPlaces,
    vehicleThumbnail,
  }) => ({
    id,
    img: vehicleThumbnail?.[0]?.image,
    imgType: vehicleThumbnail.photoType,
    isPublished: approved,
    owner: towTruckOwner,
    carNumber: {
      key: licencePlate,
      value: model,
    },
    type: carType,
    places: carPlaces,
    status: status.split('_').join(' '),
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
    companyName,
    phone,
    carsQuantity,
    carTypes,
    licensePreview,
  }) => {
    return {
      id,
      name: companyName,
      contacts: {
        phone,
      },
      cars: carsQuantity,
      services: carTypes,
      license: {
        ...licensePreview,
        fullImageUrl: `/api/carrier/${id}/searchFullPhoto/LICENCE`
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
    orderType,
    companyName,
    paymentStatus,
    capacity,
    loaded
  }) => ({
    id,
    dateRange: {
      from: deliveryFromDate ? new Date(deliveryFromDate).getTime() : null,
      to: deliveryToDate ? new Date(deliveryToDate).getTime() : null,
    },
    route: {
      from: from || 'mockStart',
      to: to || 'mockDestination',
    },
    dateTime: createdAt ? new Date(createdAt).getTime() : null,
    payment: {
      currency,
      value: amount,
    },
    orderStatus: status.split('_').join(' '),
    transportDetails: {
      key: companyName,
      value: orderType
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
