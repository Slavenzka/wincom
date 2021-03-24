import React, {useState} from 'react'
import css from './TableRow.module.scss'
import classnames from 'classnames'
import TableCell from 'components/Table/TableCell/TableCell'
import useMouseOver from 'hooks/useMouseOver'
import { PaymentStatuses } from 'utils/const'

const TableRow = ({
  className,
  rowData,
  rowTemplate,
  columnsClass,
  isOdd,
  ...props
}) => {
  const [rowRef, setRowRef] = useState(null)

  const isHovered = useMouseOver({
    node: rowRef
  })

  const isRowHighlightedWarning = rowData?.paymentStatus === PaymentStatuses.OVERDUE

  const renderCells = () => rowTemplate.map(({value}, index) => (
    <React.Fragment key={`${value} - ${index}`}>
      <TableCell
        cellData={rowData?.[value]}
        cellType={value}
        rowData={rowData}
        isHovered={isHovered}
        {...props}
      />
    </React.Fragment>
  ))

  return (
    <div
      className={classnames(css.wrapper, columnsClass, className, {
       [css.wrapperOdd]: isOdd,
       [css.wrapperHoverable]: isHovered && props?.isRowClickable,
       [css.wrapperWarning]: isRowHighlightedWarning
      })}
      ref={setRowRef}
    >
      { rowRef && renderCells() }
    </div>
  )
}

export default TableRow
