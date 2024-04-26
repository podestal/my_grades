import React from 'react'
import { Link } from 'react-router-dom'

const Assignature = ({ assignature }) => {
  return (
    <Link className='bg-gradient-to-r from-violet-600 to-indigo-950 w-[250px] h-[150px] rounded-[35px] flex items-center justify-center hover:ml-2 hover:mt-2'  state={{assignature}} to={'/dashboard'}>
      <h2 className='text-2xl font-poppins font-bold'>
        {assignature.title}
      </h2>
    </Link>
  )
}

export default Assignature