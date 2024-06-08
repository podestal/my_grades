import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Icon, Divider, Text } from '@tremor/react'
import { RiFilePaper2Line, RiBuilding3Line, RiBubbleChartLine, RiBarChart2Line } from '@remixicon/react'

const Header = () => {

    const { user } = useAuth()
    const [toggle, setToggle] = useState(false)


  return (

    <header className='z-10 bg-transparent fixed'>
      <nav className='bg-slate-950 pt-14 flex flex-col w-[240px] min-h-[100vh] items-center justify-start gap-12'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-white font-bold text-lg text-center'>Bienvenido</h3>
          <h3 className='text-white font-bold text-md text-center'>{user.first_name}</h3>
        </div>
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/main'}>
          <Icon color="violet" icon={RiFilePaper2Line} size="md"/>
          <p className='text-white font-bold text-md hover:text-slate-200'>Cursos</p>
        </Link>
        {/* <Divider className='w-[75%]'/> */}
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2'  to={'/activities'}>
          <Icon color="violet" icon={RiBuilding3Line} size="md"/>
          <p className='text-white font-bold text-md hover:text-slate-200'>Actividades</p>
        </Link>
        {/* <Divider className='w-[75%]'/> */}
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/categories'}>
          <Icon color="violet" icon={RiBubbleChartLine} size="md"/>
          <p className='text-white font-bold text-md hover:text-slate-200'>Categorías</p>
        </Link>
        {/* <Divider className='w-[75%]'/> */}
        {/* <Link className='flex flex-col w-[75%] justify-center items-center gap-2 hover:bg-transparent-10'>
          <Icon color="violet" icon={RiBarChart2Line} size="md"/>
          <p className='text-white font-bold text-md hover:text-slate-200' to={'/stats'}>Stadísticas</p>
        </Link> */}
        <button className='px-8 py-3 text-white font-bold text-lg rounded-xl justify-center bg-red-900 hover:bg-red-950 hover:text-slate-200-'>Salir</button>
        {/* <Divider className='w-[75%]'/> */}
      </nav>
    </header>

  )
}

export default Header