import React from 'react'
import { Link } from 'react-router-dom'

const Assignature = ({ assignature }) => {
  return (
    <Link state={{assignature}} to={'/activities'}>{assignature.title}</Link>
  )
}

export default Assignature