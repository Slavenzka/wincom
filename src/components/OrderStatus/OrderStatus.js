import React from 'react'
import css from './OrderStatus.module.scss'
import classnames from 'classnames'
import { OrderStatuses } from 'utils/const'
import { getStatus } from 'utils'

const OrderStatus = ({
  label,
}) => {
  const statusClass = OrderStatuses[getStatus(label)]?.class

  return (
    <span className={classnames(css.status, css[statusClass])}>
        { label }
      </span>
  )
}

export default OrderStatus
