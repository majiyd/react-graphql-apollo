import React from 'react';
import  gql  from "graphql-tag";
import { Mutation } from "react-apollo";
import styles from './Repository.module.css'
import REPOSITORY_FRAGMENT from './fragments'
import Link from "../Link";
import Star from "../Star";


// unstar repository graphql query
const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!){
    removeStar(input: {starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`
//update function to be called to update other parts of the ui after addStar mutation happens
const updateAddStar = (client, {
  data: {addStar: {starrable: {id} }}
}) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  })
  
  const totalCount = repository.stargazers.totalCount + 1

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  })
}

//updater function for when removeStar mutation occurs
const updateRemoveStar = (client, {
  data: {removeStar: {starrable: {id}}}
}) => {
  //read from apollo cache
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  })
  //repository contains everything about repository, perform update operation here
  const totalCount = repository.stargazers.totalCount - 1

  //write back to apollo cache
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  })
}


// repository component
const Repository = props => {
  return (
    <div className={styles.repository}>
      <div>
        <h2>
          <Link href={props.node.url}>{props.node.name}</Link>
          {/* check if viewer has starred and toggle star or removeStar  */}
          {props.node.viewerHasStarred ? (
            // if viewer has starred show unstar repository *
            <Mutation 
              mutation={UNSTAR_REPOSITORY} 
              variables={{id: props.node.id}}
              update={updateRemoveStar}
            >
              {(removeStar, {data, loading, error}) => (
                <span style={{cursor: "pointer"}} onClick={removeStar}>
                  <Star 
                    numberOfStarGazers={props.node.stargazers.totalCount}
                    viewerHasStarred={props.node.viewerHasStarred}
                  />
                </span>
              )}
            </Mutation>
          ) : ( 
            <Star 
              numberOfStarGazers={props.node.stargazers.totalCount}
              viewerHasStarred={props.node.viewerHasStarred}
              id={props.node.id}
            />
          )}
          
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