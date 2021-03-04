import { useState } from 'react'

const useTableHeight = ({
  wrapperRef,
  headingsRef,
  dataCount,
  rowHeight,
  limitHeight,
}) => {
  const [tableHeight, setTableHeight] = useState(700)

  const calculateTableHeight = () => {
    if (wrapperRef.current && headingsRef.current) {
      // calculation of free space for scrollable table container
      let finalContentHeight = rowHeight * dataCount
      const maxHeight =
        document.documentElement.clientHeight -
        wrapperRef.current.getBoundingClientRect().top -
        headingsRef.current.getBoundingClientRect().height

      if (finalContentHeight > limitHeight && maxHeight > limitHeight) {
        finalContentHeight = maxHeight
      }

      if (finalContentHeight > limitHeight && maxHeight < limitHeight) {
        finalContentHeight = limitHeight
      }

      finalContentHeight > 0 ? setTableHeight(finalContentHeight) : setTableHeight(70)
    }
  }

  return [tableHeight, calculateTableHeight]
}

export default useTableHeight
