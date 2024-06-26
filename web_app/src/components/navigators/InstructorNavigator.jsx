import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@tremor/react'
import { RiFilePaper2Line, RiBuilding3Line, RiBubbleChartLine, RiUser2Line, RiArticleLine } from '@remixicon/react'

const InstructorNavigator = () => {

  return (
    <>
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/main'}>
            <Icon color="violet" icon={RiFilePaper2Line} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Cursos</p>
        </Link>
        {/* <Link className='flex flex-col w-[75%] justify-center items-center gap-2'  to={'/activities'}>
            <Icon color="violet" icon={RiBuilding3Line} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Actividades</p>
        </Link> */}
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/students'}>
            <Icon color="violet" icon={RiUser2Line} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Estudiantes</p>
        </Link>
        {/* <Link className='flex flex-col w-[75%] justify-center items-center gap-2'  to={'/announcements'}>
            <Icon color="violet" icon={RiArticleLine} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Anuncios</p>
        </Link> */}
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/categories'}>
            <Icon color="violet" icon={RiBubbleChartLine} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Categorías</p>
        </Link>
    </>
  )
}

export default InstructorNavigator