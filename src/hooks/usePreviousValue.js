import {useEffect, useRef} from 'react'

const usePreviousValue = (value, initialValue) => {
  const prevValue = useRef(initialValue)

  useEffect(() => {
    prevValue.current = value
  })

  return prevValue.current
}

export default usePreviousValue
