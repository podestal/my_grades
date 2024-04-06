import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <Link to={'/'}>Home Page</Link>
    <Link to={'/login'}>Login</Link>
  </>
  )
}

export default Header