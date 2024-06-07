import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import hamburger from '../assets/icons/menu.svg'
import close from '../assets/icons/close.svg'
import { useState } from 'react'

const Header = () => {

    const { user } = useAuth()
    const [toggle, setToggle] = useState(false)

  return (

    <header className='z-10 bg-transparent fixed'>
      <nav className='bg-slate-600 flex flex-col w-[240px] min-h-[100vh] items-center'>
        <Link to={'/main'}>Cursos</Link>
        <Link to={'/activities'}>Actividades</Link>
        <Link to={'/categories'}>Categories</Link>
        <Link to={'/stats'}>Stadísticas</Link>
        {/* <Link to={'/announcements'}>Anuncios</Link> */}
        {/* <Link to={'/profile'}>Perfil</Link> */}
      </nav>
    </header>

  )
}

export default Header