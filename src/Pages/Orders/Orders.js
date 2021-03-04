import React from 'react'
import css from './Orders.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import FilterOrders from 'components/Filters/FilterOrders/FilterOrders'
import Table from 'components/Table/Table'
import { ORDERS_COLUMNS, ORDERS_DATA } from 'utils/data'
import { ORDER_DETAILS } from 'Pages/Routes'
import { NO_ROUTING_TAGS, TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import DateRangePicker from 'components/DateRangePicker/DateRangePicker'

const Orders = ({history}) => {
  const handleClickRow = (node, id) => {
    if (NO_ROUTING_TAGS.indexOf(node.tagName) < 0) {
      history.push({
        pathname: `${ORDER_DETAILS}/${id}`
      })
    }
  }

  const renderDateRangePicker = () => {
    return <DateRangePicker />
  }

  return (
    <>
      <ContentHeader
        title='Orders'
        controls={ renderDateRangePicker() }
      >
        <FilterOrders />
        <Table
          className={css.table}
          columns={ORDERS_COLUMNS}
          columnsClass={css.columns}
          data={ORDERS_DATA}
          rowSize={TABLE_ROW_HEIGHT_MEDIUM}
          handleClickRow={handleClickRow}
        />
      </ContentHeader>
    </>
  )
}

export default Orders
