import React from 'react'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import css from './Customers.module.scss'
import { CUSTOMERS_COLUMNS, CUSTOMERS_DATA } from 'utils/data'
import { TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'

const Customers = () => {
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
      <Table
        className={css.table}
        columns={CUSTOMERS_COLUMNS}
        columnsClass={css.columns}
        data={CUSTOMERS_DATA}
        rowSize={TABLE_ROW_HEIGHT_MEDIUM}
      />
    </ContentHeader>
    )
}

export default Customers
