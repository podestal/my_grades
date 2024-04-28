import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api/api'
import useAuth from '../../hooks/useAuth'

const Categories = () => {

    const { user } = useAuth()
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <p className='font-4xl text-white'>Ctageories</p>
        {categories && console.log(categories.data)}
    </div>
  )
}

export default Categories