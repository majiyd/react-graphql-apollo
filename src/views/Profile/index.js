import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {REPOSITORY_FRAGMENT} from "../../components/Repository";
import Loader from "../../components/Loader";
import ErrorHandler from '../../components/Error';
import Repositories from "../Repositories"



const GET_USER_REPOSITORIES = gql`
  {
    viewer{
      repositories(
        first: 5 
        orderBy: {field: STARGAZERS, direction: DESC}
      ) {
        edges{
          node {
            ...repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`

const Profile = () => (
  <Query query={GET_USER_REPOSITORIES}>
    {({data, loading, error}) => {
      if (error) {
        return <ErrorHandler error={error} />
      }
      const {viewer} = data
      if (loading || !viewer){
        return <Loader />
      }
      
      return <Repositories repositories={viewer.repositories} />
      
    }}
  </Query>
)

export default Profile