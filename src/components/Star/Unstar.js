import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

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
  const removeStar = ( ) => {
    mutate({
      variables: {
        id: id
      }
    })
  }
  return(
    <span onClick={removeStar} style={{
      marginLeft: 5,
      cursor: "pointer"
    }}>
      <span>&#9733;</span> {numberOfStarGazers}
    </span>
  )
}

export default graphql(UNSTAR_REPOSITORY)(Unstar)