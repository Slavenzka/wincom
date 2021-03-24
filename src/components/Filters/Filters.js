import React from 'react'
import css from './Filters.module.scss'
import Tabs from 'components/Tabs/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { setPrimaryFilterValue, setSecondaryFilterValue } from 'store/actions'
import FilterDetailed from 'components/Filters/FilterDetailed/FilterDetailed'
import useFilterData from 'hooks/useFilterData'

const Filters = ({
  filter = {},
  defaultData,
}) => {
  const activePrimary = useSelector(store => store.filter.activePrimary)
  const activeSecondary = useSelector(store => store.filter.activeSecondary)
  const activeDetailed = useSelector(store => store.filter.detailedFilter)
  const dispatch = useDispatch()


  const handleClickPrimary = evt => dispatch(setPrimaryFilterValue(evt))
  const handleClickSecondary = evt => dispatch(setSecondaryFilterValue(evt))

  const {primary, secondary, detailed} = filter

  useFilterData(defaultData, filter)

  return (
    <div className={css.wrapper}>
      {primary &&
        <Tabs
          className={css.filter}
          list={primary.list}
          activeTab={activePrimary}
          handleClickTab={handleClickPrimary}
          isPrimary
        />
      }
      {secondary?.list &&
        <Tabs
          className={css.filter}
          list={secondary.list}
          activeTab={activeSecondary}
          handleClickTab={handleClickSecondary}
        />
      }
      {detailed &&
        <FilterDetailed
          detailedList={activeDetailed}
        />
      }
    </div>
  )
}

export default React.memo(Filters)
