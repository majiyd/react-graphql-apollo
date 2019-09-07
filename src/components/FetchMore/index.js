import React from 'react'
import Button from "../Button";
import Loader from '../Loader';

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children
}) => {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        hasNextPage && (
          <Button handleClick={() => fetchMore({variables, updateQuery})}>
            More {children}
          </Button>
        )
      )}
      
    </div>
  )
}

export default FetchMore
