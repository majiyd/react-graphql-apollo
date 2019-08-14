import React from 'react';

const Repository = props => {
  return(
    <div>
      {props.node.name} {props.node.url}
    </div>
  )
}

export default Repository