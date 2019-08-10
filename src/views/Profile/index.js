import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "../../components/Loader";

const GET_USER_PROFILE = gql`
  {
    viewer{
      login
      name
      url
    }
  }
`

const Profile = () => (
  <Query query={GET_USER_PROFILE}>
    {({data, loading}) => {
      const {viewer} = data
      if (loading || !viewer){
        return <Loader />
      }
      return(
        <div>
          {viewer.url} {viewer.login}
        </div>
      )
    }}
  </Query>
)

export default Profile