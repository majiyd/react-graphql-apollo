import React from 'react';
//remember to add {data, loading, error}



const Star = ({viewerHasStarred, numberOfStarGazers,  id}) => {
  if (viewerHasStarred ){
    return(
      <span 
        style={{
          marginLeft: 5,
          cursor: "pointer"
        }}
      >
        <span>&#9733;</span> {numberOfStarGazers}
      </span>
    )
  }
  return(
    <span 
      style={{
        marginLeft: 5,
        cursor: "pointer"
      }}
    >
      <span>&#9734;</span> {numberOfStarGazers}
    </span>
  )
}

export default Star