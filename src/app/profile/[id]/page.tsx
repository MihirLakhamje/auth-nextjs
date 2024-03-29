import React from 'react'

export default function UserProfile({params}:any): React.JSX.Element {
  return (
	<div>Profile page at /page/{params.id}</div>
  )
}
