import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "../../components/Loader";
import Repositories from "../Repositories"
import ErrorHandler from '../../components/Error';

const GET_USER_REPOSITORIES = gql`
  {
    viewer{
      repositories(
        first: 5 
        orderBy: {field: STARGAZERS, direction: DESC}
      ) {
        edges{
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
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