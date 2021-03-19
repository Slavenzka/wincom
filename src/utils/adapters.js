export const carParkAdapter = data => {
  return data.map(({
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
  }) => {
    return {
      id,
      img: vehicleThumbnail.image,
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
    }
  })
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
