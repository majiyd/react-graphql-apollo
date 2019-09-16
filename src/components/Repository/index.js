import React from 'react';
import styles from './Repository.module.css'
import REPOSITORY_FRAGMENT from './fragments'
import Link from "../Link";
import Star from "../Star";

// repository component
const Repository = props => {
  return (
    <div className={styles.repository}>
      <div>
        <h2>
          <Link href={props.node.url}>{props.node.name}</Link>
          <Star 
            numberOfStarGazers={props.node.stargazers.totalCount}
            viewerHasStarred={props.node.viewerHasStarred}
            id={props.node.id}
          />
          {/* {props.node.viewerHasStarred ? (
            // if viewer has starred show unstar repository *
            <Unstar 
              numberOfStarGazers={props.node.stargazers.totalCount}
              viewerHasStarred={props.node.viewerHasStarred}
              id={props.node.id}
            />
          ) : ( 
            <Star 
              numberOfStarGazers={props.node.stargazers.totalCount}
              viewerHasStarred={props.node.viewerHasStarred}
              id={props.node.id}
            />
          )} */}
          
        </h2>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.node.descriptionHTML
        }}
      />
    </div>
  );
}


export {REPOSITORY_FRAGMENT}
export default Repository