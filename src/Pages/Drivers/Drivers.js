import React from 'react'
import css from './Drivers.module.scss'
import ContentHeader from 'components/ContentHeader/ContentHeader'
import Button from 'components/Button/Button'
import FilterDrivers from 'components/Filters/FilterDrivers/FilterDrivers'
import Table from 'components/Table/Table'
import { DRIVERS_COLUMNS, DRIVERS_DATA } from 'utils/data'
import { CARS_INFO } from 'Pages/Routes'

const Drivers = () => {
  const adaptDriversData = data => data.map(({cars, ...item}) => ({
    ...item,
    cars: {
      value: cars,
      link: `${CARS_INFO}/${item.id}`
    }
  }))

  const data = adaptDriversData(DRIVERS_DATA)
  console.log(data)

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
      <FilterDrivers />
      <Table
        className={css.table}
        columns={DRIVERS_COLUMNS}
        columnsClass={css.columns}
        data={data}
      />
    </ContentHeader>
    )
}

export default Drivers
