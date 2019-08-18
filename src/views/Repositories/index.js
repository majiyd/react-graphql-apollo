import React from 'react';
import styles from './Repositories.module.css'
import Repository from "../../components/Repository";

const Repositories = (props) => {
  return(
    <div className={styles.repositories}>
      {props.repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
      ))}
    </div>
  )
}

export default Repositories