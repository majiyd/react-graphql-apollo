import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { REPOSITORY_FRAGMENT } from '../Repository';

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

const Unstar = ({mutate, numberOfStarGazers,  id}) => {
  return(
    <span 
      onClick={( ) => {
        mutate({
          variables: {
            id: id
          }
        })
      }}
      style={{
        marginLeft: 5,
        cursor: "pointer"
      }}
    >
      <span>&#9733;</span> {numberOfStarGazers}
    </span>
  )
}

//performing update after mutation
const UNSTAR_REPOSITORY_OPTIONS = {
  //add update option
  options: {
    //update is a function that takes the client and mutaion result as argument. client is provided through global apollo provider, or so i think.
    update: (client, {data: {removeStar: {starrable: {id}}}}) => {
      //i'm reading the repository data cause it's what i want to update
      const repository = client.readFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT
      })

      //data to be updated
      const totalCount = repository.stargazers.totalCount - 1

      // write back to cache
      //client.writeFragment(id,fragment,data)
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
  }
}

//graphql(mutation,options)(component)
export default graphql(UNSTAR_REPOSITORY, UNSTAR_REPOSITORY_OPTIONS)(Unstar)