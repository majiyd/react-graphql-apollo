import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Profile from "../Profile";
import User from '../User';
import * as routes from '../../constants/routes'
import Navigation from '../../components/Navigation';

class App extends Component {
  state = {
    user: 'rwieruch'
  }
  onUserSearch = value => {
    this.setState({user: value})
  }
  render() { 
    const user =  this.state.user
    return (
      <Router>
        <Navigation 
          user={user}
          onUserSearch={this.onUserSearch}
        />
        <Route 
          exact
          path={routes.PROFILE}
          component={Profile}
        ></Route>
        <Route 
          path={routes.USER}
          component={()=>(
            <User 
              user={user}
            />
          )}
        ></Route>
      </Router>
    );
  }
}

export default App;