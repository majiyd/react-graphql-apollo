import React from 'react';
import Repository from "../../components/Repository";

const Repositories = (props) => {
  return(
    <div>
      {props.repositories.edges.map(repository => (
        <Repository key={repository.node.id} {...repository}/>
      ))}
    </div>
  )
}

export default Repositories