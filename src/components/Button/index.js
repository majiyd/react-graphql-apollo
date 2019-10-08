import React from 'react'
import styles from './Button.module.css'

const Button = ({children, handleClick, type}) => {
  if (type === 'submit'){
    return <button 
      onClick={handleClick} 
      className={styles.submitButton}>
        {children}
    </button>
  }
  return <button 
    onClick={handleClick} 
    className={styles.button}>
      {children}
  </button>
}

export default Button