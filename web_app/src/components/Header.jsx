import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Icon } from '@tremor/react'
import { RiFilePaper2Line, RiBuilding3Line, RiBubbleChartLine } from '@remixicon/react'
import Logout from './Logout'
import InstructorNavigator from './navigators/InstructorNavigator'
import PrincipalNavigator from './navigators/PrincipalNavigator'


const Header = () => {

    const { user } = useAuth()
    const [open, setOpen] = useState(false)

  return (


      <header className='z-10 bg-transparent fixed'>
      <nav className='bg-slate-950 pt-14 flex flex-col w-[240px] min-h-[100vh] items-center justify-start gap-12'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-white font-bold text-lg text-center'>Bienvenido</h3>
          <h3 className='text-white font-bold text-md text-center'>{user.first_name}</h3>
          <Logout 
            open={open}
            setOpen={setOpen}
          />
        </div>
        {user.profile == 'I' && <InstructorNavigator />}
        {user.profile == 'P' && <PrincipalNavigator />}
      </nav>
    </header>

  )
}

export default Header