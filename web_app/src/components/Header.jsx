import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const { user } = useAuth()

  return (
    <>
        {user 
        ? 
        <nav>
            <Link to={'/main'}>Cursos</Link>
            <Link to={'/grades'}>Calificaciones</Link>
            <Link to={'/profile'}>Perfil</Link>
        </nav>
        :
        <nav>
            <Link to={'/'}>Home Page</Link>
            <Link to={'/login'}>Login</Link>
        </nav>
        }
  </>
  )
}

export default Header