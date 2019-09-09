# Trying to figure out mutation using Apollo HOC

## Objectives 

+ Perform a mutation
+ Perform an update
+ Add optimistic UI
+ Add Fetchmore
+ Compose star and unstar mutation


### Performing a mutation

To perform a mutation using HOC, you create a graphql HOC like similar to this

`export default graphql(gql mutation, {options})(component)`

Options here is an object or function used to configure how query is fetched and updated.
Options is used like this
```js
graphql(MUTATION, { 
  props: {
    //pass props to component here
  },
  options: {
    //options go here
  }
})(component)
```