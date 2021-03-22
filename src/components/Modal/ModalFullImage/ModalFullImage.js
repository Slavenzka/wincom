import React, { useEffect } from 'react'
import css from './ModalFullImage.module.scss'
import useDataFetch from 'hooks/useDataFetch'
import Preloader from 'components/Preloader/Preloader'
import { useDispatch } from 'react-redux'
import { toggleModalLoadingState } from 'store/actions'

const ModalFullImage = ({
  url,
}) => {
  const dispatch = useDispatch()
  const {data, fetchingStatus} = useDataFetch({
    url
  })
  const {isLoading, isLoaded, isError} = fetchingStatus

  useEffect(() => {
    if (!isLoading && (isLoaded || isError)) {
      dispatch(toggleModalLoadingState(false))
    }
  }, [isLoading, isLoaded, isError, dispatch])

  if (!data && !isLoading) return null

  if (!data && isLoading) return (
    <Preloader className={css.preloader} />
  )

  return (
    <img
      className={css.image}
      src={`data:image/jpg;base64, ${data.image}`}
      alt={data?.title}
    />
  )
}

export default ModalFullImage
