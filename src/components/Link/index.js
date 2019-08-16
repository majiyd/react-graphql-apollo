import React from 'react'

const Link = ({children, ...props}) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default Link