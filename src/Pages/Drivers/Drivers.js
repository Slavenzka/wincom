import React, { useMemo } from 'react'
import css from './Drivers.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import { DRIVERS_COLUMNS } from 'utils/data'
import { CARS_INFO } from 'Pages/Routes'
import { filterDrivers } from 'Pages/Drivers/_assets/filters'
import Filters from 'components/Filters/Filters'
import useActualPageData from 'hooks/useActualPageData'
import useDataFetch from 'hooks/useDataFetch'
import { carriersAdapter } from 'utils/adapters'
import useCreateDriver from 'hooks/Drivers/useCreateDriver'

const Drivers = () => {
  const adaptDriversData = data => data.map(({cars, ...item}) => ({
    ...item,
    cars: {
      value: cars,
      link: `${CARS_INFO}/${item.id}`
    }
  }))

  const {data, fetchingStatus} = useDataFetch({
    url: `/api/manager/carrier`,
    options: {
      adapter: carriersAdapter
    }
  })

  const processedData = useMemo(() => {
    if (data) {
      return adaptDriversData(data)
    }

    return null
  }, [data])

  const handleClickCreate = useCreateDriver()


  const filteredData = useActualPageData()

  return (
    <ContentHeader
      title={ `Carriers` }
      controls={(
        <Button
          onClick={handleClickCreate}
        >
          + Add carrier
        </Button>
      )}
    >
      <Filters
        filter={filterDrivers}
        defaultData={processedData}
      />
      <Table
        fetchingStatus={fetchingStatus}
        className={css.table}
        columns={DRIVERS_COLUMNS}
        columnsClass={css.columns}
        filteredData={filteredData}
      />
    </ContentHeader>
  )
}

export default Drivers
