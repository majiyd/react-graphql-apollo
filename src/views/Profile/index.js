import React from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import {REPOSITORY_FRAGMENT} from "../../components/Repository";
import Loader from "../../components/Loader";
import ErrorHandler from '../../components/Error';
import Repositories from "../Repositories"

const GET_USER_REPOSITORIES = gql`
  query($cursor: String){
    user(login: "rwieruch"){
      repositories(
        first: 5 
        orderBy: {field: STARGAZERS, direction: DESC}
        after: $cursor
      ) {
        edges{
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
/**
 * 1 Remove Query Component
 * 2 move  {data, loading, error} to Profile component Argument
 * 3 create higher order component*/

const Profile = ({data, loading, error}) => {
  if (error) {
    return <ErrorHandler error={error} />
  }
  const {user} = data
  const viewer = user
  
  if (loading || !viewer){
    return <Loader />
  }
  
  return <Repositories repositories={viewer.repositories} />
  
}


export default graphql(GET_USER_REPOSITORIES)(Profile)