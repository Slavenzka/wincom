import React, { useEffect, useState } from 'react'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import css from './Customers.module.scss'
import { CUSTOMERS_COLUMNS } from 'utils/data'
import { TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import Filters from 'components/Filters/Filters'
import { filterCustomers } from 'Pages/Customers/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'
import axiosWincom from 'axiosWincom'
import { customersAdapter } from 'utils/adapters'
import useDataFetch from 'hooks/useDataFetch'
import Preloader from 'components/Preloader/Preloader'

const Customers = () => {
  const filteredData = useActualPageData()

  const {data, fetchingStatus} = useDataFetch({
    url: `/api/admin/customerInfo`,
    options: {
      adapter: customersAdapter
    }
  })

  const {isLoading, isLoaded, isError} = fetchingStatus

  const renderContent = data => {
    if (!data && isLoading) {
      return <Preloader />
    }

    if (!data && !isLoading && !isLoaded && !isError) {
      return null
    }

    console.log(data)
    console.log(fetchingStatus)

    if (data && isLoaded) {
      return (
        <>
          <Filters
            filter={filterCustomers}
            defaultData={data}
            filteredData={filteredData}
          />
          <Table
            className={css.table}
            columns={CUSTOMERS_COLUMNS}
            columnsClass={css.columns}
            data={filteredData}
            rowSize={TABLE_ROW_HEIGHT_MEDIUM}
          />
        </>
      )
    }
  }

  return (
    <ContentHeader
      title={ `Customers` }
      controls={(
        <Button
          onClick={() => {}}
        >
          + Add customer
        </Button>
      )}
    >
      { renderContent(data) }
    </ContentHeader>
    )
}

export default Customers
