import React from 'react'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import css from './Customers.module.scss'
import { CUSTOMERS_COLUMNS } from 'utils/data'
import { TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import Filters from 'components/Filters/Filters'
import { filterCustomers } from 'Pages/Customers/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'
import { customersAdapter } from 'utils/adapters'
import useDataFetch from 'hooks/useDataFetch'
import ContentProvider from 'components/ContentProvider/ContentProvider'

const Customers = () => {
  const {data, fetchingStatus} = useDataFetch({
    url: `/api/admin/customerInfo`,
    options: {
      adapter: customersAdapter
    }
  })
  const filteredData = useActualPageData()

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
      <ContentProvider
        isDataFetched={!!data}
        isDataFiltered={!!filteredData}
        fetchingStatus={fetchingStatus}
        filters={(
          <Filters
            filter={filterCustomers}
            defaultData={data}
            filteredData={filteredData}
          />
        )}
      >
        <Table
          className={css.table}
          columns={CUSTOMERS_COLUMNS}
          columnsClass={css.columns}
          data={filteredData}
          rowSize={TABLE_ROW_HEIGHT_MEDIUM}
        />
      </ContentProvider>
    </ContentHeader>
    )
}

export default Customers
