import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
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
  const addStar = ( ) => {
    mutate({
      variables: {
        id: id
      }
    })
  }
  return(
    <span onClick={addStar} style={{
      marginLeft: 5,
      cursor: "pointer"
    }}>
      <span>&#9734;</span> {numberOfStarGazers}
    </span>
  )
}

export default graphql(STAR_REPOSITORY)(Star)