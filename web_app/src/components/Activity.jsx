import React from 'react'
import { Link } from 'react-router-dom'

const Activity = ({ activity }) => {
  return (
    <Link state={{activity}} to={'/grades'}>{activity.title}</Link>
  )
}

export default Activity