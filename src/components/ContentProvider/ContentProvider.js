import React from 'react'
import Preloader from 'components/Preloader/Preloader'

const ContentProvider = ({
  isDataFetched,
  isDataFiltered,
  fetchingStatus = {},
  children,
  filters,
}) => {
  const {isLoading} = fetchingStatus

  if (!isDataFetched && isLoading) {
    return <Preloader />
  }

  if (isDataFetched && !isLoading) {
    return (
      <>
        { filters }
        { isDataFiltered && children }
      </>
    )
  }

  return null
}

export default ContentProvider
