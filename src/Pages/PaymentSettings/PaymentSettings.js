import React from 'react'
import css from './PaymentSettings.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import { CarOrderTypes } from 'utils/const'
import SettingForm from 'components/SettingForm/SettingForm'

const PaymentSettings = () => {
  const formData = [
    {
      title: 'Economy',
      list: [
        {
          type: 'inputCash',
          label: 'Price for 1 km',
          name: 'payment-setting-economy-price',
          defaultValue: 0.8
        },
        {
          type: 'inputCash',
          label: 'Next place discount',
          name: 'payment-setting-economy-discount',
          defaultValue: 0.8
        },
        {
          type: 'select',
          label: 'Car order',
          name: 'payment-setting-economy-type',
          defaultValue: CarOrderTypes.find(item => item.value === 'automatic'),
          options: CarOrderTypes
        },
      ]
    },
    {
      title: 'Premium',
      list: [
        {
          type: 'inputCash',
          label: 'Price for 1 km',
          name: 'payment-setting-economy-price',
          defaultValue: 1
        },
        {
          type: 'inputCash',
          label: 'Next place discount',
          name: 'payment-setting-economy-discount',
          defaultValue: ''
        },
        {
          type: 'select',
          label: 'Car order',
          name: 'payment-setting-economy-type',
          defaultValue: CarOrderTypes.find(item => item.value === 'automatic'),
          options: CarOrderTypes
        },
      ]
    },
    {
      title: 'Premium',
      list: [
        {
          type: 'inputCash',
          label: 'Price for 1 km',
          name: 'payment-setting-economy-price',
          defaultValue: 1.5
        },
        {
          type: 'inputCash',
          label: 'Next place discount',
          name: 'payment-setting-economy-discount',
          defaultValue: ''
        },
        {
          type: 'select',
          label: 'Car order',
          name: 'payment-setting-economy-type',
          defaultValue: CarOrderTypes.find(item => item.value === 'confirmation'),
          options: CarOrderTypes
        },
      ]
    },
  ]

  return (
    <ContentHeader
      title={ `Payment settings` }
    >
      {formData.map((item, index) => (
        <SettingForm
          className={css.form}
          key={index}
          {...item}
        />
      ))}
    </ContentHeader>
  )
}

export default PaymentSettings
