import React from 'react'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import css from './Customers.module.scss'
import { CUSTOMERS_COLUMNS, CUSTOMERS_DATA } from 'utils/data'
import { TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import Filters from 'components/Filters/Filters'
import { filterCustomers } from 'Pages/Customers/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'

const Customers = () => {
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
      <Filters
        filter={filterCustomers}
        defaultData={CUSTOMERS_DATA}
        filteredData={filteredData}
      />
      {filteredData && <Table
        className={css.table}
        columns={CUSTOMERS_COLUMNS}
        columnsClass={css.columns}
        data={filteredData}
        rowSize={TABLE_ROW_HEIGHT_MEDIUM}
      />}
    </ContentHeader>
    )
}

export default Customers
