import React from 'react'
import css from './PaymentInfo.module.scss'
import classnames from 'classnames'
import IconTrust from 'assets/icons/IconTrust'
import { getCurrencySymbol, getDateComponents } from 'utils'
import { PaymentStatuses } from 'utils/const'

const PaymentInfo = ({
  className,
  data,
}) => {
  const {isTrusted, payment, orderStatus, createdAt} = data
  const amount = `${getCurrencySymbol(payment?.currency)} ${payment?.value}`
  const {year, month, day} = getDateComponents(new Date(createdAt))
  const paymentStatusType = Object.keys(PaymentStatuses).find(type => PaymentStatuses[type].values.indexOf(orderStatus.value) >= 0)

  const renderClientStatus = () => (
    <p className={css.client}>
      <IconTrust
        className={classnames(css.icon, {
          [css.iconTrusted]: isTrusted
        })}
      />
      {isTrusted ? `Trusted Client` : `Non Trusted Client`}
    </p>
  )

  const renderList = () => (
    <dl className={css.list}>
      {payment?.value &&
        <div className={css.item}>
          <dt className={css.key}>
            Amount:
          </dt>
          <dd
            className={css.value}
            dangerouslySetInnerHTML={{ __html: amount }}
          />
        </div>
      }
      {orderStatus?.value &&
        <div className={css.item}>
          <dt className={css.key}>
            Status:
          </dt>
          <dd
            className={css.value}
            dangerouslySetInnerHTML={{ __html: orderStatus.value }}
            style={{
              color: PaymentStatuses[paymentStatusType].color
            }}
          />
        </div>
      }
      {createdAt &&
        <div className={css.item}>
          <dt className={css.key}>
            Date:
          </dt>
          <dd
            className={css.value}
            dangerouslySetInnerHTML={{ __html: `${year}.${month}.${day}` }}
          />
        </div>
      }
    </dl>
  )

  return (
    <>
      <span className={css.label}>
        Payment information
      </span>
      <div className={css.wrapper}>
        { renderClientStatus() }
        { renderList() }
      </div>
    </>
  )
}

export default PaymentInfo
