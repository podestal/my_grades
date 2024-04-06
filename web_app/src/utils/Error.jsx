import React from 'react'


const Error = ({ refetch }) => {

    const handleRefetch = () => {
        refetch()
    }

  return (
    <button onClick={handleRefetch}>Error</button>
  )
}

export default Error