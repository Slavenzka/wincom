import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from 'Pages/Home/Home'
import CarDetails from 'Pages/CarDetails/CarDetails'
import Orders from 'Pages/Orders/Orders'
import OrderDetails from 'Pages/OrderDetails/OrderDetails'
import Customers from 'Pages/Customers/Customers'
import PaymentSettings from 'Pages/PaymentSettings/PaymentSettings'
import Drivers from 'Pages/Drivers/Drivers'
import DriverParkDetails from 'Pages/DriverParkDetails/DriverParkDetails'

export const REGISTER = '/register'
export const LOGIN = '/login'
export const HOME_PAGE = '/'
export const CAR_DETAILS = '/car'
export const ORDERS = '/orders'
export const ORDER_DETAILS = '/order'
export const CUSTOMERS = '/customers'
export const PAYMENT_SETTINGS = '/settings'
export const DRIVERS = '/drivers'
export const CARS_INFO = '/cars'

export const SIDEBAR_LIST = [
  {
    label: 'Car park',
    url: '/',
    counter: 111
  },
  {
    label: 'Orders',
    url: ORDERS,
    counter: 6,
  },
  {
    label: 'Customers',
    url: CUSTOMERS,
  },
  {
    label: 'Carriers',
    url: DRIVERS,
  },
  {
    label: 'Payment settings',
    url: PAYMENT_SETTINGS,
  },
]

// TODO apply async import of page components to split the initial js chunk
const Routes = () => {
  return (
    <Switch>
      <Route exact path={LOGIN}>
        <Redirect to={HOME_PAGE} />
      </Route>
      <Route exact path={HOME_PAGE} component={Home} />
      <Route exact path={`${CAR_DETAILS}/:id`} component={CarDetails} />
      <Route exact path={ORDERS} component={Orders} />
      <Route exact path={`${ORDER_DETAILS}/:id`} component={OrderDetails} />
      <Route exact path={CUSTOMERS} component={Customers} />
      <Route exact path={PAYMENT_SETTINGS} component={PaymentSettings} />
      <Route exact path={DRIVERS} component={Drivers} />
      <Route exact path={ `${CARS_INFO}/:id` } component={DriverParkDetails} />
    </Switch>
  )
}

export default Routes
