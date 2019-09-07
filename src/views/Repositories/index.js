import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";

const updateQuery = (previousResult, {fetchMoreResult}) => {
  if (!fetchMoreResult){
    return previousResult
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ]
      }
    }
  }
}
const Repositories = (props) => {
  return(
    <div className={styles.repositories}>
      {props.repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
      ))}
      {props.repositories.pageInfo.hasNextPage && (
        <button onClick={() => {
          props.fetchMore({
            variables: {
              cursor: props.repositories.pageInfo.endCursor
            },
            updateQuery
          })
        }}>
          More Repositories
        </button>
      )}
    </div>
  )
}

export default Repositories