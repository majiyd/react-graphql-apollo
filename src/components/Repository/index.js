import React from 'react';
import { graphql } from 'react-apollo';
import {loader} from "graphql.macro"
import {flowRight as compose} from 'lodash'
import REPOSITORY_FRAGMENT from './fragments'
import styles from './Repository.module.css'
import Link from "../Link";
import Star from "../Star";

const ADD_STAR = loader('./star.graphql')
const REMOVE_STAR = loader('./removeStar.graphql')

// repository component
const Repository = props => {
  return (
    <div className={styles.repository}>
      <div>
        <h2>
          <Link href={props.node.url}>{props.node.name}</Link>
          <Star 
            numberOfStarGazers={props.node.stargazers.totalCount}
            viewerHasStarred={props.node.viewerHasStarred}
            id={props.node.id}
            addStar={props.addStar}
            removeStar={props.removeStar}
          />
          
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

const ADD_STAR_OPTIONS = {
  props: ({mutate}) => ({
    addStar: id => {
      mutate({
        variables: {id},
        optimisticResponse: {
          addStar: {
            __typename: 'Mutation',
            starrable: {
              id: id,
              __typename: 'Repository',
              viewerHasStarred: true
            }
          }
        }
      })
    }
  })
}
const REMOVE_STAR_OPTIONS = {
  props: ({mutate}) => ({
    removeStar: id => {
      mutate({
        variables: {id},
        optimisticResponse: {
          removeStar: {
            __typename: 'Mutation',
            starrable: {
              id: id,
              __typename: 'Repository',
              viewerHasStarred: false
            }
          }
        }
      })
    }
  })
}
export {REPOSITORY_FRAGMENT}
export default compose(
  graphql(ADD_STAR, ADD_STAR_OPTIONS),
  graphql(REMOVE_STAR, REMOVE_STAR_OPTIONS)
)(Repository)