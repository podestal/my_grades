import React from 'react'

const Activity = ({ activity }) => {
  return (
    <div className='activity-item'>
        <p>{activity.title}</p>
    </div>
  )
}

export default Activity