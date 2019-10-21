import gql from 'graphql-tag'

const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository{
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
    watchers {
      totalCount
    }
    viewerSubscription
    owner{
      login
    }
  }
`;

export default REPOSITORY_FRAGMENT