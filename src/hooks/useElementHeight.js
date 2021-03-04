import {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'

const useElementHeight = () => {
  const [elHeight, setElHeight] = useState(0)
  const fontSize = useSelector(store => store.elastic.curFontSize)
  const elRef = useRef(null)

  useEffect(() => {
    setElHeight(elRef.current.getBoundingClientRect().height)

  }, [fontSize])

  return [elHeight, elRef]
}

export default useElementHeight
