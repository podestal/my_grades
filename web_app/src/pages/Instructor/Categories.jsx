import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import Category from '../../components/categories/Category'
import { TextInput, Button, Dialog, DialogPanel } from '@tremor/react'
import CreateCategory from '../../components/categories/CreateCategory'
import Loading from '../../utils/Loading'

const Categories = () => {

    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories({ token: user.access })
    })

    if (isLoading) return <Loading />

  return (
    <div className='w-full h-[100vh] flex flex-col gap-6 mx-auto items-center justify-center'>
        <h2 className='text-white font-poppins text-4xl my-8'>Categorías</h2>
        {categories && categories.data.map( category => (
            <Category 
                key={category.id}
                category={category}
            />
        ) )}
        <Button color='violet-950' onClick={() => setOpen(true)} className='mt-8 hover:bg-violet-900'>Crear Categoría</Button>
        {open && 
            <Dialog open={open} onClose={() => setOpen(false)}>
                <CreateCategory 
                    setOpen={setOpen}
                />
            </Dialog>
        }
    </div>
  )
}

export default Categories