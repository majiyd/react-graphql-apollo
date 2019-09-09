import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";
import Loader from '../../components/Loader';

const Repositories = ({repositories, loading, fetchMore, hasNextPage}) => {
  return(
    <div className={styles.repositories}>
      {repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
      ))}
      {loading ? (
        <Loader />
      ) : (
        hasNextPage && (
          <button style={{display: "inline"}} onClick={fetchMore}>
            More Repositories
          </button>
        )
      )}
      
    </div>
  )
}

export default Repositories