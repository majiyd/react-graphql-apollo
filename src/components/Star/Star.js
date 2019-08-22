import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import {REPOSITORY_FRAGMENT} from '../Repository'
//remember to add {data, loading, error}

const STAR_REPOSITORY = gql`
  mutation($id: ID!){
    addStar(input: {starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const Star = ({mutate, numberOfStarGazers,  id}) => {
  return(
    <span onClick={( ) => {
      mutate({
        variables: {
          id: id
        },
        optimisticResponse: {
          addStar: {
            __typename: 'Mutation',
            starrable: {
              __typename: 'Repository',
              id,
              viewerHasStarred: true
            }
          }
        }
      })
    }} 
    style={{
      marginLeft: 5,
      cursor: "pointer"
    }}>
      <span>&#9734;</span> {numberOfStarGazers}
    </span>
  )
}

const STAR_REPOSITORY_OPTIONS = {
  options: {
    update: (client, {data: {addStar: {starrable: {id}}}}) => {
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
  }
}

export default graphql(STAR_REPOSITORY, STAR_REPOSITORY_OPTIONS)(Star)