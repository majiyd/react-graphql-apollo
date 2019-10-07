import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Profile from "../Profile";
import * as routes from '../../constants/routes'
import Navigation from '../../components/Navigation';

class App extends Component {
  render() { 
    return (
      <Router>
        <Navigation />
        <Route 
          exact
          path={routes.PROFILE}
          component={Profile}
        ></Route>
        <Route 
          path={routes.USER}
          component={()=>{
            return(
              <div>user</div>
            )
          }}
        ></Route>
      </Router>
    );
  }
}

export default App;