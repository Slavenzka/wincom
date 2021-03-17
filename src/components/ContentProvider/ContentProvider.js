import React from 'react'
import css from './ContentProvider.module.scss'
import classnames from 'classnames'
import Preloader from 'components/Preloader/Preloader'

const ContentProvider = ({
  className,
  data,
  fetchingStatus = {},
  children
}) => {
  const {isLoading, isLoaded, isError} = fetchingStatus

  if (!data && !isLoading && !isLoaded && !isError) {
    return null
  }

  if (!data && isLoading) {
    return <Preloader />
  }



}

export default ContentProvider
