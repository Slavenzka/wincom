import React from 'react'
import css from './DriverParkDetails.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import { DRIVERS } from 'Pages/Routes'
import DetailsForm from 'components/DetailsForm/DetailsForm'
import { DRIVER_PARK_DATA } from 'utils/data'
import FormInfo from 'components/FormInfo/FormInfo'
import { SERVICE_TYPES_OPTIONS } from 'utils/const'
import ImageViewer from 'components/ImageViewer/ImageViewer'

const DriverParkDetails = ({match}) => {
  // const driverID = match?.params?.id
  const data = DRIVER_PARK_DATA

  const getCarInfo = ({status, places, payment}) => ([
    {
      key: 'Status',
      value: status,
    },
    {
      key: 'Free places',
      value: places.total - places.loaded,
    },
    {
      key: 'Payment',
      value: payment,
    },
  ])

  const getFormItems = data => ({
    owner: {
      type: 'input',
      label: 'Car',
      name: `car-details-owner`,
      defaultValue: data?.owner,
      validation: {
        required: true,
      }
    },
    type: {
      type: 'select',
      label: 'Type',
      name: `car-details-type`,
      defaultValue: SERVICE_TYPES_OPTIONS.find(item => data?.type ? item.value.toUpperCase() === data.type.toUpperCase() : false),
      options: SERVICE_TYPES_OPTIONS,
      validation: {
        required: true,
      }
    },
    places: {
      type: 'input',
      label: 'Places',
      name: `car-details-places`,
      defaultValue: data?.places?.total,
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
    picker: {
      type: 'datepicker',
      label: 'Insurance update reminder',
      name: `car-details-insurance`,
      date: new Date(data?.insuranceReminder),
      validation: {
        required: true,
      },
      isSelectedOnDayClick: true,
    },
  })

  const submitForm = data => {
    console.log(data)
  }

  const renderCards = () => data.map((item, index) => (
    <div className={css.card} key={index}>
      <DetailsForm
        rawData={item}
        getFormItems={getFormItems}
        submitForm={submitForm}
        infoBlock={(
          <FormInfo
            list={getCarInfo(item)}
          />
        )}
      >
        { () => <ImageViewer imageArray={item.img} />}
      </DetailsForm>
    </div>
  ))

  return (
    <ContentHeader
      title='Cars'
      backlink={DRIVERS}
      className={css.wrapper}
    >
      { renderCards() }
    </ContentHeader>
  )
}

export default DriverParkDetails
