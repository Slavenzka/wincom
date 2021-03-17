import React, { useMemo } from 'react'
import css from './Drivers.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import Table from 'components/Table/Table'
import { DRIVERS_COLUMNS, DRIVERS_DATA } from 'utils/data'
import { CARS_INFO } from 'Pages/Routes'
import { filterDrivers } from 'Pages/Drivers/_assets/filters'
import Filters from 'components/Filters/Filters'
import useActualPageData from 'hooks/useActualPageData'

const Drivers = () => {
  const adaptDriversData = data => data.map(({cars, ...item}) => ({
    ...item,
    cars: {
      value: cars,
      link: `${CARS_INFO}/${item.id}`
    }
  }))
  const data = useMemo(() => adaptDriversData(DRIVERS_DATA), [])

  const filteredData = useActualPageData()

  return (
    <ContentHeader
      title={ `Drivers` }
      controls={(
        <Button
          onClick={() => {}}
        >
          + Add driver
        </Button>
      )}
    >
      <Filters
        filter={filterDrivers}
        defaultData={data}
        filteredData={filteredData}
      />
      {filteredData &&
        <Table
          className={css.table}
          columns={DRIVERS_COLUMNS}
          columnsClass={css.columns}
          data={filteredData}
        />
      }
    </ContentHeader>
    )
}

export default Drivers
