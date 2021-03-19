import React from 'react'
import css from './Home.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import { CAR_PARK_COLUMNS } from 'utils/data'
import { CAR_DETAILS } from 'Pages/Routes'
import { NO_ROUTING_TAGS } from 'utils/const'
import Filters from 'components/Filters/Filters'
import { filterCarPark } from 'Pages/Home/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'
import useDataFetch from 'hooks/useDataFetch'
import { carParkAdapter } from 'utils/adapters'
import ContentProvider from 'components/ContentProvider/ContentProvider'

const Home = ({history}) => {
  const handleClickRow = (node, id) => {
    if (NO_ROUTING_TAGS.indexOf(node.tagName) < 0) {
      history.push({
        pathname: `${CAR_DETAILS}/${id}`
      })
    }
  }

  const {data, fetchingStatus} = useDataFetch({
    url: `/api/admin/transport`,
    options: {
      adapter: carParkAdapter
    }
  })
  const filteredData = useActualPageData()

  return (
    <>
      <ContentHeader
        title={ `Car park` }
        controls={(
          <Button
            onClick={() => {}}
          >
            + Add car
          </Button>
        )}
      >
        <ContentProvider
          isDataFetched={!!data}
          isDataFiltered={!!filteredData}
          fetchingStatus={fetchingStatus}
          filters={(
            <Filters
              filter={filterCarPark}
              defaultData={data}
              filteredData={filteredData}
            />
          )}
        >
          <Table
            className={css.table}
            columns={CAR_PARK_COLUMNS}
            columnsClass={css.columns}
            data={filteredData}
            handleClickRow={handleClickRow}
          />
        </ContentProvider>
      </ContentHeader>
    </>
  )
}

export default Home
