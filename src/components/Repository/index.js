import React from 'react';
import  gql  from "graphql-tag";
import { Mutation } from "react-apollo";
import Link from "../Link";
import Star from "../Star";

const STAR_REPOSITORY = gql`
  mutation($id: ID!){
    addStar(input: {starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`
const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!){
    removeStar(input: {starrableId: $id}) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

const Repository = props => {
  return (
    <div>
      <div>
        <h2>
          <Link href={props.node.url}>{props.node.name}</Link>
          {props.node.viewerHasStarred ? (
            <Mutation 
              mutation={UNSTAR_REPOSITORY} 
              variables={{id: props.node.id}}
            >
              {(removeStar, {data, loading, error}) => (
                <span style={{cursor: "pointer"}} onClick={removeStar}>
                  <Star 
                    numberOfStarGazers={props.node.stargazers.totalCount}
                    viewerHasStarred={props.node.viewerHasStarred}
                  />
                </span>
              )}
            </Mutation>
          ) : (
            <Mutation 
              mutation={STAR_REPOSITORY} 
              variables={{id: props.node.id}}
            >
              {(addStar, {data, loading, error}) => (
                <span style={{cursor: "pointer"}} onClick={addStar}>
                  <Star 
                    numberOfStarGazers={props.node.stargazers.totalCount}
                    viewerHasStarred={props.node.viewerHasStarred}
                  />
                </span>
              )}
            </Mutation>
          )}
          
        </h2>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.node.descriptionHTML
        }}
      />
    </div>
  );
}

export default Repository