import React from 'react';

const ErrorHandler = ({error}) => {
  return(
    <div>
      {error.toString()}
    </div>
  )
}

export default ErrorHandler