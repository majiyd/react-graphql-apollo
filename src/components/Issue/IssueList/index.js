import React from 'react'
import {Query} from 'react-apollo'
import {loader} from "graphql.macro"
import ErrorHandler from '../../Error';
import Loader from '../../Loader';
import IssueItem from '../IssueItem';

const GET_ISSUES_OF_REPOSITORIES = loader('./issues.graphql')

const Issues = ({repositoryOwner, repositoryName}) => {
  return (
    <Query
      query={GET_ISSUES_OF_REPOSITORIES}
      variables={{
        repositoryOwner,
        repositoryName
      }}
    >
      {({data, loading, error}) => {
        if (error){
          return <ErrorHandler error={error}/>
        }
        const {repository} = data

        if (loading && !repository){
          return <Loader />
        }
        if (!repository.issues.edges.length){
          return <div>No Issues Found!</div>
        }
        return <IssueList issues={repository.issues}/>
      }}
    </Query>
  )

}
const IssueList = ({issues}) => (
  <div>
    {issues.edges.map(({node})=>(
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
)

export default Issues
