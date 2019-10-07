import React from 'react'
import {Query} from 'react-apollo'
import {loader} from "graphql.macro"

const GET_USER_REPOSITORIES = loader('./userRepositories.graphql')

const User = () => {
  console.log(GET_USER_REPOSITORIES)
  return (
    <div>
      user maj
    </div>
  )
}

export default User
