import React, { useState, useRef, useEffect, useCallback } from 'react'
import css from './FilterDetailedItemRange.module.scss'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

const FilterDetailedItemRange = ({
  className,
  minValue = '0',
  actualMin,
  maxValue = '10000',
  actualMax,
  currencySymbol = '',
  onChange,
}) => {
  const [range, setRange] = useState({
    min: {
      x: 0,
      value: actualMin,
    },
    max: {
      x: 0,
      value: actualMax,
    },
    gaugeWidthRem: null
  })
  const [fontSize, setFontSize] = useState(null)
  const fontSizeRedux = useSelector(store => store.elastic.curFontSize)

  const isSetMinValue = useRef(false)
  const isSetMaxValue = useRef(false)
  const gaugeRef = useRef(null)
  const gaugeSelectedRef = useRef(null)
  const thumbMinRef = useRef(null)
  const thumbMaxRef = useRef(null)

  const handleDragThumbMin = useCallback((evt) => {
    evt.preventDefault()
    let startCoordX = evt.clientX

    const handleMouseMove = evt => {
      evt.preventDefault()

      const shift = (startCoordX - evt.clientX) / fontSize
      startCoordX = evt.clientX

      setRange(prevState => {
        const updatedCoord = Math.min(Math.max(0, prevState.min.x - shift), prevState.max.x)
        const selectedPart = updatedCoord / prevState.gaugeWidthRem
        const updatedValue = (selectedPart * (maxValue - minValue) + minValue).toFixed(0)

        return {
          ...prevState,
          min: {
            value: updatedValue >= minValue ? updatedValue : minValue,
            x: Math.min(Math.max(0, prevState.min.x - shift), prevState.max.x)
          }
        }
      })
    }

    const handleMouseUp = evt => {
      evt.preventDefault()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [fontSize, maxValue, minValue])

  const handleDragThumbMax = useCallback((evt) => {
    evt.preventDefault()
    let startCoordX = evt.clientX

    const handleMouseMove = evt => {
      evt.preventDefault()

      const shift = (startCoordX - evt.clientX) / fontSize
      startCoordX = evt.clientX

      setRange(prevState => {
        const updatedCoord = Math.max(Math.min(prevState.max.x - shift, prevState.gaugeWidthRem), prevState.min.x)
        const selectedPart = updatedCoord / prevState.gaugeWidthRem
        const updatedValue = (selectedPart * maxValue).toFixed(0)

        return {
          ...prevState,
          max: {
            value: updatedValue >= minValue ? updatedValue : minValue,
            x: updatedCoord
          }
        }
      })
    }

    const handleMouseUp = evt => {
      evt.preventDefault()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [fontSize, minValue, maxValue])

  useEffect(() => {
    const minRef = thumbMinRef.current
    const maxRef = thumbMaxRef.current

    if (minRef && maxRef) {
      minRef.addEventListener('mousedown', handleDragThumbMin)
      maxRef.addEventListener('mousedown', handleDragThumbMax)
    }

    return () => {
      minRef && minRef.removeEventListener('mousedown', handleDragThumbMin)
      maxRef && maxRef.removeEventListener('mousedown', handleDragThumbMax)
    }
  }, [handleDragThumbMin, handleDragThumbMax])

  useEffect(() => {
    if (thumbMaxRef.current && gaugeRef.current) {
      const gaugeWidth = fontSize ? gaugeRef.current.getBoundingClientRect().width / fontSize : null

      setRange(prevState => ({
        ...prevState,
        max: {
          value: prevState.max.value,
          x: gaugeWidth
        },
        gaugeWidthRem: gaugeWidth
      }))
    }
  }, [fontSize])

  useEffect(() => {
    if (!fontSize) {
      setFontSize(fontSizeRedux)
    }
  }, [fontSizeRedux, fontSize])

  useEffect(() => {
    if (!isSetMinValue.current && range.gaugeWidthRem) {
      setRange(prevState => ({
        ...prevState,
        min: {
          x: actualMin === minValue ? 0 : actualMin / maxValue * prevState.gaugeWidthRem,
          value: actualMin
        }
      }))
      isSetMinValue.current = true
    }

  }, [range.gaugeWidthRem, actualMin, maxValue, minValue])

  useEffect(() => {
    if (!isSetMaxValue.current && range.gaugeWidthRem) {
      setRange(prevState => ({
        ...prevState,
        max: {
          x: actualMax === maxValue ? prevState.gaugeWidthRem : actualMax / maxValue * prevState.gaugeWidthRem,
          value: actualMax
        }
      }))
      isSetMaxValue.current = true
    }
  }, [range.gaugeWidthRem, actualMax, maxValue])

  useEffect(() => {
    onChange(+range.min.value, `from`)
  }, [range.min.value, onChange])

  useEffect(() => {
    onChange(+range.max.value, `to`)
  }, [range.max.value, onChange])

  return (
    <div className={classnames(css.wrapper, className)}>
      <div className={css.info}>
        <span
          className={css.label}
          dangerouslySetInnerHTML={{ __html: currencySymbol ? `${currencySymbol} ${range.min.value}` : `${range.min.value}` }}
        />
        <span
          className={css.label}
          dangerouslySetInnerHTML={{ __html: currencySymbol ? `${currencySymbol} ${range.max.value}` : `${range.max.value}` }}
        />
      </div>
      <div className={css.controls}>
        <div
          className={classnames(css.thumb, css.thumbMin)}
          ref={thumbMinRef}
          style={{
            left: `${range.min.x}rem`,
            zIndex: actualMin === maxValue ? 3 : 2
          }}
        />
        <div className={css.gauge} ref={gaugeRef} />
        <div
          className={css.gaugeSelectedRange}
          ref={gaugeSelectedRef}
          style={{
            left: `${range.min.x}rem`,
            width: `${range.max.x - range.min.x}rem`
          }}
        />
        <div
          className={classnames(css.thumb, css.thumbMax)}
          ref={thumbMaxRef}
          style={{
            left: `${range.max.x}rem`,
            zIndex: actualMax === minValue ? 3 : 2
          }}
        />
      </div>
    </div>
  )
}

export default FilterDetailedItemRange
