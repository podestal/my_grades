import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

    const { user } = useAuth()

  return (
    <>
      <header className='sm:px-16 px-8 py-8 z-10  w-full absolute bg-[#00040f]'>
        {user.access 
          ? 
          <nav>
              <Link to={'/main'}>Cursos</Link>
              <Link to={'/califications'}>Calificaciones</Link>
              <Link to={'/profile'}>Perfil</Link>
          </nav>
          :
          <nav className='flex justify-between items-center max-w-[1440px] my-0 mx-auto'>
              <h1 className='text-white text-4xl font-bold'>LOGO</h1>
              <div className='flex-1 flex justify-end items-center gap-16 max-lg:hidden'>
                <Link className='font-montserrat text-white-400 text-lg hover:text-white' to={'/'}>Main</Link>
                <Link className='font-montserrat text-white-400 text-lg hover:text-white' to={'/features'}>Carácterísticas</Link>
                <Link className='font-montserrat text-white-400 text-lg hover:text-white' to={'/login'}>Ingresar</Link>
              </div>
          </nav>
          }
      </header>
  </>
  )
}

export default Header