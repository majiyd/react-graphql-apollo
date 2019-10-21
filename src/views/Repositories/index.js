import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import Loader from '../../components/Loader';
import FetchMore from '../../components/FetchMore';
import Issues from '../../components/Issue'

const Repositories = ({repositories, loading, fetchMore, hasNextPage}) => {
  return(
    <div className={styles.repositories}>
      {repositories.edges.map(repository => (
        <div key={repository.node.id}>
          <Repository  {...repository}/>
          <Issues
            repositoryOwner={repository.node.owner.login}
            repositoryName={repository.node.name}
          />
        </div>
      ))}
      {loading ? (
        <Loader />
      ) : (
        hasNextPage &&(
          <FetchMore fetchMore={fetchMore}>
            Repositories
          </FetchMore>      
        )
      )}
      
    </div>
  )
}

export default Repositories