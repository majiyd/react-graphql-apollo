import React from 'react';
// import styles from './Star.module.css'

const Star = ({numberOfStarGazers, viewerHasStarred}) => {
  return(
    <span style={{marginLeft: 5}}>
      {viewerHasStarred ? (
        <span>&#9733;</span>
      ) : (
        <span>&#9734;</span>
      )}
      {numberOfStarGazers}
    </span>
  )
}

export default Star