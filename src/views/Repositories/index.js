import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import FetchMore from '../../components/FetchMore';

const getUpdateQuery = entry => (previousResult, {fetchMoreResult}) => {
  if (!fetchMoreResult){
    return previousResult
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ]
      }
    }
  }
}
const Repositories = ({repositories, loading, fetchMore, entry}) => {
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
        updateQuery={getUpdateQuery(entry)}
        fetchMore={fetchMore}
      >
        Repositories
      </FetchMore>      
    </div>
  )
}

export default Repositories