import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebarCollapse } from 'store/actions'
import useEffectDepsWatched from 'hooks/useEffectDepsWatched'

const useToggleSidebar = () => {
  const [isUncollapsed, setUncollapsedStatus] = useState(false)
  const isSidebarCollapsed = useSelector(store => store.ui.isSidebarCollapsed)
  const dispatch = useDispatch()

  useEffectDepsWatched(compare => {
    const {before, after} = compare?.[0] || {}

    if (before && !after) {
      setUncollapsedStatus(true)
    } else {
      setUncollapsedStatus(false)
    }
  }, [isSidebarCollapsed])


  useEffect(() => {

  }, [isSidebarCollapsed])

  const handleClickCollapseButton = () => {
    dispatch(toggleSidebarCollapse(!isSidebarCollapsed))
  }

  return {
    isSidebarCollapsed,
    isUncollapsed,
    handleClickCollapseButton
  }
}

export default useToggleSidebar
