import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DesktopApp from 'App/DesktopApp'
import ElasticAdaptive from 'hoc/ElasticAdaptive'
import { isBrowser, isMobile } from 'react-device-detect'
import { setDeviceType } from 'store/actions'
import { DeviceTypes } from 'utils/const'
import withModal from 'hoc/withModal'

const ViewSwitcher = () => {
  const type = useSelector(state => state.elastic.deviceType)
  const dispatch = useDispatch()

  // to avoid excessive render of wrong view (desktop for adaptive users) initial value of
  // state.elastic.deviceType is null and is defined before render anything at all
  useEffect(() => {
    const getDeviceType = () => {
      if (isBrowser) {
        dispatch(setDeviceType(DeviceTypes.DESKTOP))
      }

      if (isMobile) {
        dispatch(setDeviceType(DeviceTypes.ADAPTIVE))
      }
    }

    getDeviceType()
  })

  if (!type) return null

  return (
    <ElasticAdaptive>
      <DesktopApp />
      {/*{*/}
      {/*  type === DeviceTypes.DESKTOP*/}
      {/*    ? <DesktopApp />*/}
      {/*    : <AdaptiveApp />*/}
      {/*}*/}
    </ElasticAdaptive>
  )
}

export default withModal(ViewSwitcher)
