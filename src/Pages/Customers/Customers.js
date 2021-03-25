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
import useCreateCustomer from 'hooks/Customers/useCreateCustomer'

const Customers = () => {
  const {data, fetchingStatus} = useDataFetch({
    url: `/api/manager/customerInfo`,
    options: {
      adapter: customersAdapter
    }
  })
  const filteredData = useActualPageData()
  const handleClickCreate = useCreateCustomer()

  return (
    <ContentHeader
      title={ `Customers` }
      controls={(
        <Button
          onClick={handleClickCreate}
        >
          + Add customer
        </Button>
      )}
    >
      <Filters
        filter={filterCustomers}
        defaultData={data}
      />
      <Table
        fetchingStatus={fetchingStatus}
        className={css.table}
        columns={CUSTOMERS_COLUMNS}
        columnsClass={css.columns}
        filteredData={filteredData}
        rowSize={TABLE_ROW_HEIGHT_MEDIUM}
      />
    </ContentHeader>
    )
}

export default Customers
