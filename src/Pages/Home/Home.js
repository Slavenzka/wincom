import React from 'react'
import css from './Home.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import { CAR_PARK_COLUMNS, CAR_PARK_DATA } from 'utils/data'
import { CAR_DETAILS } from 'Pages/Routes'
import { NO_ROUTING_TAGS } from 'utils/const'
import useFilterData from 'hooks/useFilterData'
import Filters from 'components/Filters/Filters'
import { filterCarPark } from 'Pages/Home/_assets/filters'
import useActualPageData from 'hooks/useActualPageData'

const Home = ({history}) => {
  const handleClickRow = (node, id) => {
    if (NO_ROUTING_TAGS.indexOf(node.tagName) < 0) {
      history.push({
        pathname: `${CAR_DETAILS}/${id}`
      })
    }
  }

  useFilterData(CAR_PARK_DATA, filterCarPark)
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
        <Filters
          filter={filterCarPark}
        />
        {filteredData && <Table
          className={css.table}
          columns={CAR_PARK_COLUMNS}
          columnsClass={css.columns}
          data={filteredData}
          handleClickRow={handleClickRow}
        />}
      </ContentHeader>
    </>
  )
}

export default Home
