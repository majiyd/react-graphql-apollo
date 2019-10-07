import React from 'react'
import { Link } from "react-router-dom";
import * as routes from '../../constants/routes'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.navlink} to={routes.PROFILE}>My Repos</Link>
      <Link className={styles.navlink} to={routes.USER}>Github User</Link>
    </div>
  )
}

export default Navigation
