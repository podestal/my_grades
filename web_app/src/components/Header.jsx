import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Icon, Divider } from '@tremor/react'
import { RiFilePaper2Line, RiBuilding3Line, RiBubbleChartLine, RiBarChart2Line } from '@remixicon/react'

const Header = () => {

    const { user } = useAuth()
    const [toggle, setToggle] = useState(false)


  return (

    <header className='z-10 bg-transparent fixed'>
      <nav className='bg-slate-950 pt-14 flex flex-col w-[240px] min-h-[100vh] items-center justify-start gap-2'>
        <div className='flex flex-col w-[75%] justify-center items-center gap-2'>
          <Icon color="violet" icon={RiFilePaper2Line} size="lg"/>
          <Link className='text-white font-bold text-lg' to={'/main'}>Cursos</Link>
          <Divider />
        </div>
        <div className='flex flex-col w-[75%] justify-center items-center gap-2'>
          <Icon color="violet" icon={RiBuilding3Line} size="lg"/>
          <Link className='text-white font-bold text-lg' to={'/activities'}>Actividades</Link>
          <Divider />
        </div>
        <div className='flex flex-col w-[75%] justify-center items-center gap-2'>
          <Icon color="violet" icon={RiBubbleChartLine} size="lg"/>
          <Link className='text-white font-bold text-lg' to={'/categories'}>Categories</Link>
          <Divider />
        </div>
        <div className='flex flex-col w-[75%] justify-center items-center gap-2'>
          <Icon color="violet" icon={RiBarChart2Line} size="lg"/>
          <Link className='text-white font-bold text-lg' to={'/stats'}>Stadísticas</Link>
          <Divider />
        </div>
      </nav>
    </header>

  )
}

export default Header