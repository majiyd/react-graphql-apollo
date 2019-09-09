import React from 'react'
import Button from '../Button';

const FetchMore = ({children, fetchMore}) => {
  return (
    <div>
      <Button handleClick={fetchMore}> 
        More {children}
      </Button>  
    </div>
  )
}

export default FetchMore
