import React from 'react';
import Link from "../Link";
import Star from "../Star";

const Repository = props => {
  return(
    <div>
      <div>
        <h2>
          <Link href={props.node.url}>{props.node.name}</Link>
          <Star 
            numberOfStarGazers={props.node.stargazers.totalCount}
          />
        </h2>
      </div>
      <div 
        dangerouslySetInnerHTML={{
          __html: props.node.descriptionHTML
        }} 
      />
    </div>
  )
}

export default Repository