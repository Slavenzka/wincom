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
