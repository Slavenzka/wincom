import React from 'react'
import css from './Orders.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Table from 'components/Table/Table'
import { ORDERS_COLUMNS, ORDERS_DATA } from 'utils/data'
import { ORDER_DETAILS } from 'Pages/Routes'
import { NO_ROUTING_TAGS, TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import DateRangePicker from 'components/DateRangePicker/DateRangePicker'
import Filters from 'components/Filters/Filters'
import { filterOrders } from 'Pages/Orders/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'
import useDataFetch from 'hooks/useDataFetch'
import { ordersAdapter } from 'utils/adapters'
import ContentProvider from 'components/ContentProvider/ContentProvider'

const Orders = ({history}) => {
  const handleClickRow = (node, id) => {
    if (NO_ROUTING_TAGS.indexOf(node.tagName) < 0) {
      history.push({
        pathname: `${ORDER_DETAILS}/${id}`
      })
    }
  }

  const {data, fetchingStatus} = useDataFetch({
    url: `/api/manager/order`,
    options: {
      adapter: ordersAdapter
    }
  })

  const filteredData = useActualPageData()

  return (
    <>
      <ContentHeader
        title='Orders'
        controls={ <DateRangePicker /> }
      >
        <Filters
          defaultData={data}
          filter={filterOrders}
        />
        <Table
          fetchingStatus={fetchingStatus}
          className={css.table}
          columns={ORDERS_COLUMNS}
          columnsClass={css.columns}
          filteredData={filteredData}
          rowSize={TABLE_ROW_HEIGHT_MEDIUM}
          handleClickRow={handleClickRow}
        />
      </ContentHeader>
    </>
  )
}

export default Orders
