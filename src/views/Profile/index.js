import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {REPOSITORY_FRAGMENT} from "../../components/Repository";
import Loader from "../../components/Loader";
import ErrorHandler from '../../components/Error';
import Repositories from "../Repositories"



const GET_USER_REPOSITORIES = gql`
  query($cursor: String){
    viewer{
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

const Profile = () => (
  <Query 
    query={GET_USER_REPOSITORIES}
    notifyOnNetworkStatusChange={true}
  >
    {({data, loading, error, fetchMore}) => {
      {/* fetchMore is graphql inbuilt pagination handler */}
      if (error) {
        return <ErrorHandler error={error} />
      }
      const {viewer} = data
      if (loading && !viewer){
        return <Loader />
      }
      
      return <Repositories 
        repositories={viewer.repositories} 
        fetchMore={fetchMore}
        loading={loading}
      />
      
    }}
  </Query>
)

export default Profile