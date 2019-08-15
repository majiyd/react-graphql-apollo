import React from 'react';
// import styles from './Star.module.css'

const Star = ({numberOfStarGazers}) => {
  return(
    <span style={{marginLeft: 5}}>
      &#9733;{numberOfStarGazers}
    </span>
  )
}

export default Star