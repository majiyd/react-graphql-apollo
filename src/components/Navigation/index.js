import React from 'react'
import { Link, withRouter} from "react-router-dom";
import * as routes from '../../constants/routes'
import styles from './Navigation.module.css'
import UserSearch from '../UserSearch'

const Navigation = ({location: {pathname}, user, onUserSearch})=>{
  return (
    <div className={styles.navbar}>
      <Link className={styles.navlink} to={routes.PROFILE}>My Repos</Link>
      <Link className={styles.navlink} to={routes.USER}>Github User</Link>
      {pathname === routes.USER && (
        <UserSearch 
          user={user}
          onUserSearch={onUserSearch}
        />
      )}
    </div>     
  )
}

export default withRouter(Navigation)
