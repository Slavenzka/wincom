import React from 'react'
import css from './TableCell.module.scss'
import classnames from 'classnames'
import { TableCellTypes } from 'utils/const'
import TableImage from 'components/Table/TableImage/TableImage'
import Checkbox from 'components/Checkbox/Checkbox'
import { useForm, Controller } from 'react-hook-form'
import IconTrust from 'assets/icons/IconTrust'
import { getCurrencySymbol, getDateComponents } from 'utils'
import OrderStatus from 'components/OrderStatus/OrderStatus'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleModal } from 'store/actions'
import { HOME_PAGE } from 'Pages/Routes'
import ModalFullImage from 'components/Modal/ModalFullImage/ModalFullImage'

const TableCell = ({
  cellData,
  cellType,
  rowData,
  isHovered,
  isRowClickable,
}) => {
  const dispatch = useDispatch()
  const {control} = useForm()

  const getCellType = dataKey => Object.keys(TableCellTypes).reduce((total, item) => {
    if (!total && TableCellTypes[item].values.findIndex(el => el.toUpperCase() === dataKey.toUpperCase()) >= 0) {
      total = TableCellTypes[item].type
    }
    return total
  }, null)

  const renderKeyValue = (key, value) => (
    <p
      className={classnames(css.cell, {
        [css.cellHovered]: isHovered && isRowClickable
      })}
    >
      { key }
      <span className={css.value}>
        { value }
      </span>
    </p>
  )

  const type = getCellType(cellType)

  if (type === TableCellTypes.IMG.type) {
    return (
      <TableImage
        url={cellData}
        label={rowData?.owner}
        altLabel={ `Photo of vehicle ${rowData?.id}` }
        isHovered={isHovered}
      />
    )
  }

  if (type === TableCellTypes.ID.type) {
    return (
      <span
        className={classnames(css.cell, css.link, {
          [css.cellHovered]: isHovered && isRowClickable,
          [css.linkHovered]: isHovered && isRowClickable
        })}
      >
        <span className={css.linkContent}>
          { `#${cellData}` }
        </span>
      </span>
    )
  }

  if (type === TableCellTypes.KEY_VALUE.type) {
    return renderKeyValue(cellData.key, cellData.value)
  }

  if (type === TableCellTypes.STATUS.type) {
    return (
      <form>
        <Controller
          as={Checkbox}
          name={rowData?.id}
          control={control}
          defaultValue={cellData}
        />
      </form>
    )
  }

  if (type === TableCellTypes.DATE_AND_TIME.type) {
    const dateObj = new Date(cellData)
    const {year, month, day, hours, minutes} = getDateComponents(dateObj)
    const key = `${day}.${month}.${year}`
    const value = `${hours}:${minutes}`

    return renderKeyValue(key, value)
  }

  if (type === TableCellTypes.DATE.type) {
    if (typeof cellData === 'object' && cellData?.from && cellData?.to) {
      const {from, to} = cellData
      const dateFrom = new Date(from)
      const {year: yearFrom, month: monthFrom, day: dayFrom} = getDateComponents(dateFrom)
      const dateTo = new Date(to)
      const {year: yearTo, month: monthTo, day: dayTo} = getDateComponents(dateTo)

      return (
        <div className={classnames(css.cell, {
          [css.cellHovered]: isHovered && isRowClickable
        })}>
          { `${yearFrom}.${monthFrom}.${dayFrom} - ${yearTo}.${monthTo}.${dayTo}` }
        </div>
      )
    }

    const dateObj = new Date(cellData)
    const {year, month, day} = getDateComponents(dateObj)

    return (
      <div className={classnames(css.cell, {
        [css.cellHovered]: isHovered && isRowClickable
      })}>
        { `${day}.${month}.${year}` }
      </div>
    )
  }

  if (type === TableCellTypes.CLIENT_STATUS.type) {
    return (
      <div className={classnames(css.cell, css.cellCentered, {
        [css.cellHovered]: isHovered && isRowClickable,
      })}>
        { cellData ? <IconTrust className={css.iconTrust} /> : 'No' }
      </div>
    )
  }

  if (type === TableCellTypes.PRICE.type) {
    const symbol = getCurrencySymbol(cellData?.currency)
    return (
      <div
        className={classnames(css.cell, {
          [css.cellHovered]: isHovered && isRowClickable
        })}
        dangerouslySetInnerHTML={{ __html: `${symbol} ${cellData.value}` }}
      />
    )
  }

  if (type === TableCellTypes.DELIVERY_STATUS.type) {
    const {key, value} = cellData

    const status = (
      <OrderStatus label={key} />
    )

    return renderKeyValue(status, value)
  }

  if (typeof cellData === 'object' && type === TableCellTypes.PLACES.type) {
    const loaded = cellData.loaded
    const total = cellData.total

    return (
      <div className={css.cell}>
        { loaded }
        {total && <> / <span className={css.cellThin}>{total}</span></>}
      </div>
    )
  }

  if (type === TableCellTypes.ORDERS_ACTIVE.type) {
    return (
      <div className={classnames(css.cell, css.cellCentered, css.cellOrders, {
        [css.cellHovered]: isHovered,
        [css.linkHovered]: isHovered,
      })}>
        <Link className={css.link} to={'#'}>
          <span className={css.linkContent}>
            { cellData }
          </span>
          <span
            className={classnames(css.hint, {
              [css.hintVisible]: isHovered && isRowClickable
            })}
          >
            Show orders
          </span>
        </Link>
      </div>
    )
  }

  if (type === TableCellTypes.ORDERS_TOTAL.type) {
    return (
      <div className={classnames(css.cell, {
        [css.cellHovered]: isHovered && isRowClickable,
        [css.linkHovered]: isHovered && isRowClickable
      })}>
        <Link className={css.link} to={'#'}>
          <span className={css.linkContent}>
            { cellData }
          </span>
        </Link>
      </div>
    )
  }

  if (type === TableCellTypes.CONTACTS.type) {
    return (
      <div className={classnames(css.cell, css.contacts, {
        [css.cellHovered]: isHovered && isRowClickable,
      })}>
        {cellData.email &&
          <span className={css.contact}>
            {cellData.email}
          </span>
        }
        {cellData.phone &&
          <span className={css.contact}>
            {cellData.phone}
          </span>
        }
      </div>
    )
  }

  if (type === TableCellTypes.PREVIEW.type) {
    // const handleClickPreview = () => dispatch(toggleModal((
    //   <img className={css.full} src={cellData} alt={ `Driving license of ${rowData.name}` } />
    // )))

    const handleClickPreview = () => {
      if (cellData.hasOwnProperty(`fullImageUrl`)) {
        dispatch(toggleModal((
          <ModalFullImage
            url={cellData.fullImageUrl}
          />
        ), {
          isContentOnly: true,
          isLoading: true
        }))
      }
    }

    const previewString = cellData.hasOwnProperty('image')
      ? cellData.image
      : null

    return (
      <div className={css.cell}>
        {previewString &&
          <button
            className={css.previewTrigger}
            onClick={handleClickPreview}
            type='button'
          >
            <img
              className={css.preview}
              src={`data:image/jpg;base64, ${previewString}`}
              alt={`Driving license of ${rowData.name}`}
            />
          </button>
        }
      </div>
    )
  }

  if (type === TableCellTypes.LINK.type) {
    return (
      <div className={classnames(css.cell, {
        [css.cellHovered]: isHovered
      })}>
        <Link
          className={classnames(css.link, {
            [css.linkHovered]: isHovered
          })}
          to={cellData?.link || HOME_PAGE}
        >
          { cellData?.value || 'link'}
        </Link>
      </div>
    )
  }

  const getCellData = data => {
    if (`${cellData}`.toUpperCase() === 'NONE') {
      return '-'
    }

    if (Array.isArray(cellData)) {
      return cellData.reduce((total, item, index) => {
        total += index !== cellData.length - 1
          ? `${item}<br />`
          : `${item}`
        return total
      }, ``)
    }

    return data
  }

  return (
    <div
      className={classnames(css.cell, {
        [css.cellHovered]: isHovered && isRowClickable
      })}
      dangerouslySetInnerHTML={{ __html: getCellData(cellData) }}
    />
  )
}

export default TableCell
