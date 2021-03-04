import React from 'react'
import css from './Filters.module.scss'
import Tabs from 'components/Tabs/Tabs'
import useFilterDefaults from 'hooks/useFilterDefaults'

const Filters = ({
  primaryList,
  activePrimary,
  handleClickPrimary,
  secondaryList,
  activeSecondary,
  handleClickSecondary
}) => {
  const {list, activeItem, handleClickItem} = useFilterDefaults()

  return (
    <div className={css.wrapper}>
      <Tabs
        className={css.filter}
        list={primaryList || list}
        activeTab={activePrimary || activeItem}
        handleClickTab={handleClickPrimary || handleClickItem}
        isDecorated
      />
      <Tabs
        className={css.filter}
        list={secondaryList}
        activeTab={activeSecondary}
        handleClickTab={handleClickSecondary}
      />
    </div>
  )
}

export default Filters
