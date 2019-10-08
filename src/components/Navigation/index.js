import React from 'react'
import { Link, withRouter} from "react-router-dom";
import * as routes from '../../constants/routes'
import styles from './Navigation.module.css'
import UserSearch from '../UserSearch'

class Navigation extends React.Component{
  state = {
    name: 'rwieruch'
  }
  onUserSearch =  value => {
    this.setState({name: value})
  }
  
  render(){
    const {location: {pathname}} =  this.props
    return (
      <div className={styles.navbar}>
        <Link className={styles.navlink} to={routes.PROFILE}>My Repos</Link>
        <Link className={styles.navlink} to={routes.USER}>Github User</Link>
        {pathname === routes.USER && (
          <UserSearch 
            name={this.state.name}
            onUserSearch={this.onUserSearch}
          />
        )}
      </div>     
    )
  }
}

export default withRouter(Navigation)
