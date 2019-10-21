import React from 'react'
import {Query} from 'react-apollo'
import {loader} from "graphql.macro"
import ErrorHandler from '../../Error';
import Loader from '../../Loader';
import IssueItem from '../IssueItem';
import Button from '../../Button';

const GET_ISSUES_OF_REPOSITORIES = loader('./issues.graphql')

const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSED: "CLOSED"
}

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: "Show Open Issues",
  [ISSUE_STATES.OPEN]: "Show Closed Issues",
  [ISSUE_STATES.CLOSED]: "Hide Issues",
}

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
}
const isShow = issueState => issueState !== ISSUE_STATES.NONE
class Issues extends React.Component{
  state = {
    issueState: ISSUE_STATES.NONE
  }
  onChangeIssueState = nextIssueState => {
    this.setState({issueState: nextIssueState})
  }

  render(){
    const {issueState} = this.state
    const {repositoryName, repositoryOwner} =  this.props
    return(
      <div>
        <Button 
          handleClick={()=>{this.onChangeIssueState(TRANSITION_STATE[issueState])}}
        >
          {TRANSITION_LABELS[issueState]}
        </Button>
        {isShow(issueState) && (
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
              const filteredIssues = {
                issues: {
                  edges: repository.issues.edges.filter(
                    issue => issue.node.state === issueState                 
                  )
                }
              }
              if (!filteredIssues.issues.edges.length){
                return <div>No Issues Found!</div>
              }
              return <IssueList issues={filteredIssues.issues}/>
            }}
          </Query>
        )}
      </div>
    )
  }
}


const IssueList = ({issues}) => (
  <div>
    {issues.edges.map(({node})=>(
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
)

export default Issues
