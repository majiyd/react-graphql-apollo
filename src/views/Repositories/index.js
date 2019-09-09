import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import Loader from '../../components/Loader';
import FetchMore from '../../components/FetchMore';

const Repositories = ({repositories, loading, fetchMore, hasNextPage}) => {
  return(
    <div className={styles.repositories}>
      {repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
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