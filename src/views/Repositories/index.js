import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import FetchMore from '../../components/FetchMore';

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

      <FetchMore
        loading={loading}
        hasNextPage={repositories.pageInfo.hasNextPage}
        variables={{
          cursor: repositories.pageInfo.endCursor
        }}
        updateQuery={updateQuery}
        fetchMore={fetchMore}
      >
        Repositories
      </FetchMore>      
    </div>
  )
}

export default Repositories