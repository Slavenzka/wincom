import React from 'react'
import Preloader from 'components/Preloader/Preloader'

const ContentProvider = ({
  isDataFetched,
  fetchingStatus = {},
  children,
  filters,
}) => {
  const {isLoading, isError} = fetchingStatus

  if (!isDataFetched && isLoading) {
    return (
      <>
        { filters }
        <Preloader />
      </>
    )
  }

  if ((isDataFetched || isError) && !isLoading) {
    return (
      <>
        { filters }
        { children }
      </>
    )
  }

  return null
}

export default ContentProvider
