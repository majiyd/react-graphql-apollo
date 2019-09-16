import React from 'react';
//remember to add {data, loading, error}



const Star = ({viewerHasStarred, numberOfStarGazers,  id, addStar, removeStar}) => {
  if (viewerHasStarred ){
    return(
      <span 
        onClick={()=>{
          removeStar(id)
        }}
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
      onClick={()=>{
        addStar(id)
      }}
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