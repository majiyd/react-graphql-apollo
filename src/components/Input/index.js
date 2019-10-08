import React from 'react'
import styles from "./Input.module.css";

const Input = ({placeholder, handleChange, value}) => {
  return (
    <div className={styles.inputWrapper}>
      <input 
        className={styles.input}      
        placeholder={placeholder} 
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

export default Input
