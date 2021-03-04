import React from 'react'
import { ORDERS_DATA } from 'utils/data'
import OrderStatus from 'components/OrderStatus/OrderStatus'
import { SERVICE_TYPES_OPTIONS } from 'utils/const'
import DetailsForm from 'components/DetailsForm/DetailsForm'
import FormInfo from 'components/FormInfo/FormInfo'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import { ORDERS } from 'Pages/Routes'
import PaymentInfo from 'components/PaymentInfo/PaymentInfo'

const OrderDetails = ({match}) => {
  const orderID = match?.params?.id
  const data = ORDERS_DATA.find(item => item.id === orderID)

  const {createdAt, orderStatus, clientID} = data

  const orderInfo = [
    {
      key: 'Date',
      value: createdAt,
    },
    {
      key: 'Status',
      value: <OrderStatus label={orderStatus.key} />,
    },
    {
      key: 'Client ID',
      value: clientID,
    },
  ]

  const formItems = data => ({
    owner: {
      type: 'input',
      label: 'Car',
      name: `order-details-owner`,
      defaultValue: data?.transportDetails?.key,
      isDisabled: true,
    },
    type: {
      type: 'input',
      label: 'Type',
      name: `order-details-type`,
      defaultValue: SERVICE_TYPES_OPTIONS.find(item => item.value.toUpperCase() === data?.transportDetails?.value.toUpperCase())?.label,
      isDisabled: true,
    },
    places: {
      type: 'input',
      label: 'Places filled',
      name: `order-details-places-filled`,
      defaultValue: data?.places?.loaded,
      isDisabled: true,
    },
    number: {
      type: 'input',
      label: 'Car number',
      name: `order-details-number`,
      defaultValue: data?.carNumber?.key,
      isDisabled: true,
    },
    model: {
      type: 'input',
      label: 'Model',
      name: `order-details-model`,
      defaultValue: data?.carNumber?.value,
      isDisabled: true,
    },
    capacity: {
      type: 'input',
      label: 'Places',
      name: `order-details-capacity`,
      defaultValue: data?.places?.total || 0,
      isDisabled: true,
    },
  })

  return (
    <ContentHeader
      title='Order details'
      backlink={ORDERS}
    >
      <DetailsForm
        data={data}
        inputsList={formItems(data)}
        infoBlock={(
          <FormInfo
            list={orderInfo}
          />
        )}
        isWithControls={false}
      >
        { () => (
          <PaymentInfo data={data} />
        )}
      </DetailsForm>
    </ContentHeader>
  )
}

export default OrderDetails
