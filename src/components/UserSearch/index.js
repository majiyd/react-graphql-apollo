import React from 'react'
import styles from "./UserSearch.module.css";
import Button from '../Button';
import Input from '../Input';

const UserSearch = () => {
  return (
    <div className={styles.userSearch}>
      <form className={styles.form}>
        <Input 
          placeholder={"Search Users"}
        />
        <Button type={"submit"}>
          Search
        </Button>
      </form>
    </div>
  )
}

export default UserSearch
