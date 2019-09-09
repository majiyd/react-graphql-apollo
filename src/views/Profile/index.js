import React from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import {REPOSITORY_FRAGMENT} from "../../components/Repository";
import Loader from "../../components/Loader";
import ErrorHandler from '../../components/Error';
import Repositories from "../Repositories"

const GET_USER_REPOSITORIES = gql`
  query ($cursor: String) {
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

const Profile = ({loading, error, user, onFetchMore}) => {
  if (error) {
    return <ErrorHandler error={error} />
  }
  
  if (loading && !user){
    return <Loader />
  }
  
  return <Repositories 
    repositories={user.repositories} 
    fetchMore={onFetchMore}
    loading={loading}
    hasNextPage={user.repositories.pageInfo.hasNextPage}
  />
  
}
/** options = {props(props and that you'll require){
 *  return {
 *    props, fetched data, etc,
 *    prop function that trigger fetchmore: () => {
 *      return fetchMore ({
 *       @NOTE fetchMore is the built in apollo feature that handles fetching more data
 *        query,
 *        variables,
 *        @note updateQuery is apollo inbuilt feature for handling updates after successful fetch operation.
 *        updateQuery: (previousResult, {fetchMoreResult}) => {
 *          return {data structure}
 *        }
 *    })
 *    }
 *  }
 * }}
 
*/
const UPDATE_QUERY = (previousResult, {fetchMoreResult}) => {
  return {
    ...previousResult,
    user: {
      ...previousResult.user,
      repositories: {
        ...previousResult.user.repositories,
        ...fetchMoreResult.user.repositories,
        edges: [
          ...previousResult.user.repositories.edges,
          ...fetchMoreResult.user.repositories.edges
        ]
      }
    }
  }
}
const OPTIONS = {
  props({data: {loading, error, user, fetchMore}}){
    return {
      loading,
      user,
      error,
      onFetchMore: () => {
        return fetchMore({
          query: GET_USER_REPOSITORIES,
          variables: {
            cursor: user.repositories.pageInfo.endCursor
          },
          updateQuery: UPDATE_QUERY
        })
      }
    }
  },
  options: {
    notifyOnNetworkStatusChange: true
  }
}

export default graphql(GET_USER_REPOSITORIES, OPTIONS)(Profile)