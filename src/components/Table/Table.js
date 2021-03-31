import React, { useEffect, useRef } from 'react'
import css from './Table.module.scss'
import classnames from 'classnames'
import TableHeadings from 'components/Table/TableHeadings/TableHeadings'
import { useSelector } from 'react-redux'
import { TABLE_ROW_HEIGHT_MEDIUM } from 'utils/const'
import useTableHeight from 'hooks/useTableHeight'
import { FixedSizeList as List } from 'react-window'
import TableRow from 'components/Table/TableRow/TableRow'
import NoDataMessage from 'components/NoDataMessage/NoDataMessage'
import Preloader from 'components/Preloader/Preloader'

const Table = ({
  fetchingStatus = {},
  className,
  columns,
  columnsClass,
  filteredData,
  handleClickRow,
  rowSize = TABLE_ROW_HEIGHT_MEDIUM
}) => {
  const data = filteredData || []
  const fontSize = useSelector(store => store.elastic.curFontSize)

  const wrapperRef = useRef(null)
  const headingsRef = useRef(null)
  const listRef = useRef(null)
  const isHeightCalculated = useRef(false)

  const rowHeight = (rowSize * fontSize) / 10
  const limitHeight = 5 * rowSize / 10 * fontSize
  const {isLoading, isLoaded, isError} = fetchingStatus

  const [tableHeight, setTableHeight] = useTableHeight({
    headingsRef,
    wrapperRef,
    dataCount: data.length,
    rowHeight,
    limitHeight,
  })

  useEffect(() => {
    if (!isHeightCalculated.current) {
      setTableHeight()
      isHeightCalculated.current = true
    }

    return () => {
      isHeightCalculated.current = false
    }
  }, [data, rowHeight, data.length, limitHeight, setTableHeight, fontSize])

  // Uncomment when primary or secondary filter is operational to restore list position when
  // filter is changed. Not required if no primary / secondary filter is set
  // useEffect(() => {
  //   const list = listRef.current
  //
  //   return () => {
  //     if (list && list.state.scrollOffset !== 0) {
  //       list.scrollTo(0)
  //     }
  //   }
  // }, [activeFilter])

  const renderTable = () => {
    return (
      <>
        {isHeightCalculated.current && data.length > 0 && (
          <List
            height={tableHeight + 20 || 0}
            ref={listRef}
            itemCount={data.length}
            itemSize={Math.floor(rowHeight)}
          >
            {({ style, index }) => (
              <div
                onClick={handleClickRow
                  ? evt => handleClickRow(evt.target, data[index].id)
                  : null}
                className={css.rowWrapper}
                style={{
                  ...style,
                }}
              >
                <TableRow
                  className={classnames({
                    [css.rowClickable]: handleClickRow
                  })}
                  rowData={data[index]}
                  rowTemplate={columns}
                  columnsClass={columnsClass}
                  isOdd={index % 2 !== 0}
                  isRowClickable={!!handleClickRow}
                />
              </div>
            )}
          </List>
          )}
      </>
    )
  }

  return (
    <div className={classnames(css.wrapper, className)} ref={wrapperRef}>
      <TableHeadings
        list={columns}
        columnsClass={columnsClass}
        setRef={headingsRef}
      />
      {isLoading &&
        <Preloader />
      }
      {!isLoading && isLoaded && Array.isArray(filteredData) && filteredData.length > 0 &&
        <div className={css.table}>
          {renderTable()}
        </div>
      }
      {(isError || (isLoaded && Array.isArray(filteredData) && filteredData.length === 0)) &&
        <NoDataMessage />
      }
    </div>
  )
}

export default React.memo(Table)
