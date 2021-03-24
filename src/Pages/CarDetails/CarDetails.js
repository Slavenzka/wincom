import React from 'react'
import css from './CarDetails.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import { HOME_PAGE } from 'Pages/Routes'
import DetailsForm from 'components/DetailsForm/DetailsForm'
import FormInfo from 'components/FormInfo/FormInfo'
import { SERVICE_TYPES_OPTIONS } from 'utils/const'
import ImageInput from 'components/ImageInput/ImageInput'
import useDataFetch from 'hooks/useDataFetch'
import ContentProvider from 'components/ContentProvider/ContentProvider'
import { carParkAdapter } from 'utils/adapters'
import ButtonFullImage from 'components/ButtonFullImage/ButtonFullImage'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import ModalFullImage from 'components/Modal/ModalFullImage/ModalFullImage'

const CarDetails = ({match}) => {
  const carID = match?.params?.id
  const dispatch = useDispatch()

  const {data, fetchingStatus} = useDataFetch({
    url: `/api/manager/transport/${carID}`,
    options: {
      adapter: carParkAdapter
    }
  })

  const carInfo = [
    {
      key: 'Status',
      value: data?.status || '',
    },
    {
      key: 'Free places',
      value: data?.freePlaces || '',
    },
    {
      key: 'Payment',
      value: data?.payment || '',
    },
  ]

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
      defaultValue: data?.type ? SERVICE_TYPES_OPTIONS.find(item => item.value.toUpperCase() === data.type.toUpperCase()) : '',
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

  const handleClickPreview = () => {
    dispatch(toggleModal((
      <ModalFullImage
        url={ `/api/admin/transport/${carID}/searchFullPhoto/${data.imgType}` }
      />
    ), {
      isContentOnly: true,
    }))
  }

  return (
    <ContentHeader
      className={css.wrapper}
      title='Car details'
      backlink={HOME_PAGE}
    >
      <ContentProvider
        fetchingStatus={fetchingStatus}
        isDataFetched={!!data}
      >
        <DetailsForm
          rawData={data}
          getFormItems={getFormItems}
          infoBlock={(
            <FormInfo
              list={carInfo}
              auxBlock={renderShowOrdersButton()}
            />
          )}
        >
          {register => (
            <>
              <ButtonFullImage
                image={data?.img}
                onClick={handleClickPreview}
                className={css.image}
                altLabel={ `${data?.carNumber?.value} - ${data?.carNumber?.key}` }
              />
              <ImageInput
                className={css.inputImage}
                register={register}
                images={data?.img}
                label='Select photo to upload'
                name='car-details-photo'
              />
            </>
          )}
        </DetailsForm>
      </ContentProvider>
    </ContentHeader>
  )
}

export default CarDetails
