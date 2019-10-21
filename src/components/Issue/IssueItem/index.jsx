import React from 'react'
import Link from '../../Link';

const IssueItem = ({issue}) => {
  return (
    <div>
      <h3>
        <Link href={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
    </div>
  )
}

export default IssueItem
