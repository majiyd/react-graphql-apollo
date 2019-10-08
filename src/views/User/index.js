import React from 'react'
import {Query} from 'react-apollo'
import {loader} from "graphql.macro"
import ErrorHandler from '../../components/Error';
import Loader from '../../components/Loader';
import Repositories from '../Repositories';

const GET_USER_REPOSITORIES = loader('./userRepositories.graphql')


const User = ({user}) => {
  return (
    <Query
      query={GET_USER_REPOSITORIES}
      variables={{user}}
      skip={user===""}
      notifyOnNetworkStatusChange={true}
    >
      {({data, loading, error, fetchMore}) => {
        if (error) {
          return <ErrorHandler error={error} />;
        }
        const { user } = data;
        if (loading && !user) {
          return <Loader />;
        }

        return (
          <Repositories
            repositories={user.repositories}
            fetchMore={fetchMore}
            loading={loading}
          />
        );
      }}
      
    </Query>
    
  )
}

export default User
