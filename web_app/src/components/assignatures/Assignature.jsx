import React from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const Assignature = ({ assignature }) => {

  return (
    <Link className='text-center min-h-40 font-bold mx-auto my-12 py-8 w-[300px] flex items-center justify-center border border-purple-950  rounded-[35px] cursor-pointer hover:bg-slate-900 shadow-violet-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]'  state={{assignature}} to={'/dashboard'}>
      <h2 className='text-2xl font-poppins font-bold'>
        {assignature.title}
      </h2>
    </Link>
  )
}

export default Assignature