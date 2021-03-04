import { useEffect, useState } from 'react'

const useMouseOver = ({
  node,
}) => {
  const [isHovered, setHoveredStatus] = useState(false)

  const handleMouseEnter = () => {
    setHoveredStatus(true)
  }

  const handleMouseLeave = () => {
    setHoveredStatus(false)
  }

  useEffect(() => {
    const element = node

    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [node])

  return isHovered
}

export default useMouseOver
