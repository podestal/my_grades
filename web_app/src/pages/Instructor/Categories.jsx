import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import Category from '../../components/categories/Category'
import { TextInput, Button, Dialog, DialogPanel } from '@tremor/react'
import CreateCategory from '../../components/categories/CreateCategory'
import Loading from '../../utils/Loading'
import { useGetCategories } from '../../tanstack/Categories'
import CategoryChart from '../../components/categories/CategoryChart'
import useCategories from '../../hooks/useCategories'
import GetCategories from '../../components/getters/GetCategories'

const Categories = () => {

    const [open, setOpen] = useState(false)
    const { categories, setCategories } = useCategories()


  return (
    <>
        {
            categories == 0 
            ? 
            <GetCategories 
                setCategories={setCategories}
            />
            : 
            <div className='w-full h-[100vh] flex flex-col gap-6 mx-auto items-center justify-center'>
                <div className='flex items-center justify-center gap-12 mb-12'>
                <h2 className='text-white font-poppins text-4xl'>Categorías</h2>
                <Button color='violet-950' onClick={() => setOpen(true)} className=' hover:bg-violet-900'>Crear Categoría</Button>
                </div>
                {categories && categories.map( category => (
                    <Category 
                        key={category.id}
                        category={category}
                    />
                ) )}
                {open && 
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <CreateCategory 
                            setOpen={setOpen}
                        />
                    </Dialog>
                }
                <CategoryChart 
                    categories={categories}
                />
            </div>
        }

    </>
  )
}

export default Categories