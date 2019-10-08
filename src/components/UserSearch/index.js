import React from 'react'
import styles from "./UserSearch.module.css";
import Button from '../Button';

const UserSearch = () => {
  return (
    <div className={styles.userSearch}>
      <Button ><div style={{padding: "1px 5px"}}>Search</div></Button>
    </div>
  )
}

export default UserSearch
