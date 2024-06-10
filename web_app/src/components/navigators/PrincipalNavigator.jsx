import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@tremor/react'
import { RiUser2Line } from '@remixicon/react'

const PrincipalNavigator = () => {
  return (
    <>
        <Link className='flex flex-col w-[75%] justify-center items-center gap-2' to={'/students'}>
            <Icon color="violet" icon={RiUser2Line} size="md"/>
            <p className='text-white font-bold text-md hover:text-slate-200'>Estudiantes</p>
        </Link>
    </>
  )
}

export default PrincipalNavigator