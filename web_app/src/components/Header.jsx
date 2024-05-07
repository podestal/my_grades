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

    <header className='sm:px-16 px-8 z-10  w-full relative bg-transparent '>
      <nav className='bg-slate-600 absolute left-0 flex flex-col w-[220px]'>
        <Link to={'/main'}>Cursos</Link>
        <Link to={'/activities'}>Actividades</Link>
        <Link to={'/categories'}>Categories</Link>
        <Link to={'/announcements'}>Anuncios</Link>
        {/* <Link to={'/profile'}>Perfil</Link> */}
      </nav>
    </header>

  )
}

export default Header