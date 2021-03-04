import React from 'react'
import css from './CarDetails.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import { HOME_PAGE } from 'Pages/Routes'
import DetailsForm from 'components/DetailsForm/DetailsForm'
import { CAR_PARK_DATA } from 'utils/data'
import FormInfo from 'components/FormInfo/FormInfo'
import { SERVICE_TYPES_OPTIONS } from 'utils/const'
import ImageInput from 'components/ImageInput/ImageInput'

const CarDetails = ({match}) => {
  const carID = match?.params?.id
  const data = CAR_PARK_DATA.find(item => item.id === carID)

  const {status, freePlaces, payment} = data
  const carInfo = [
    {
      key: 'Status',
      value: status,
    },
    {
      key: 'Free places',
      value: freePlaces,
    },
    {
      key: 'Payment',
      value: payment,
    },
  ]

  const formItems = data => ({
    owner: {
      type: 'input',
      label: 'Car',
      name: `car-details-owner`,
      defaultValue: data?.isPartner ? 'Partner' : 'WINCOM',
      validation: {
        required: true,
      }
    },
    type: {
      type: 'select',
      label: 'Type',
      name: `car-details-type`,
      defaultValue: SERVICE_TYPES_OPTIONS.find(item => item.value.toUpperCase() === data?.type.toUpperCase()),
      options: SERVICE_TYPES_OPTIONS,
      validation: {
        required: true,
      }
    },
    places: {
      type: 'input',
      label: 'Places',
      name: `car-details-places`,
      defaultValue: data?.places,
      validation: {
        required: true,
      }
    },
    number: {
      type: 'input',
      label: 'Car number',
      name: `car-details-number`,
      defaultValue: data?.carNumber?.key,
      validation: {
        required: true,
      }
    },
    model: {
      type: 'input',
      label: 'Model',
      name: `car-details-model`,
      defaultValue: data?.carNumber?.value,
      validation: {
        required: true,
      }
    },
  })

  const renderShowOrdersButton = () => {
    return (
      <button
        className={css.button}
        onClick={() => {}}
        type='button'
      >
        Show orders
      </button>
    )
  }

  return (
    <ContentHeader
      title='Car details'
      backlink={HOME_PAGE}
    >
      <DetailsForm
        data={data}
        inputsList={formItems(data)}
        infoBlock={(
          <FormInfo
            list={carInfo}
            auxBlock={renderShowOrdersButton()}
          />
        )}
      >
        {register => (
          <ImageInput
            className={css.image}
            register={register}
            images={data?.img}
            label='Select photo to upload'
            name='car-details-photo'
          />
        )}
      </DetailsForm>
    </ContentHeader>
  )
}

export default CarDetails
