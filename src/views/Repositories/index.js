import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import Loader from '../../components/Loader';

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
const Repositories = ({repositories, loading, fetchMore}) => {
  return(
    <div className={styles.repositories}>
      {repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
      ))}
      {loading ? (
        <Loader />
      ) : (
        repositories.pageInfo.hasNextPage && (
          <button onClick={() => {
            fetchMore({
              variables: {
                cursor: repositories.pageInfo.endCursor
              },
              updateQuery
            })
          }}>
            More Repositories
          </button> 
        )
      )}
    </div>
  )
}

export default Repositories