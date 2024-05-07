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
import { styles } from '../../utils/styles'

const Categories = () => {

    const [open, setOpen] = useState(false)
    const { categories, setCategories } = useCategories()


  return (
    <div className='min-h-[100vh]'>
        <div className='flex items-center justify-center gap-12 w-full'>
            <h2 className={`my-12 ${styles.gradientTitle}`}>Categorías</h2>
            <Button disabled={categories.length == 0 ? true : false} color='violet-950' onClick={() => setOpen(true)} className=' hover:bg-violet-900'>Crear Categoría</Button>
        </div>
        {
            categories.length == 0 
            ? 
            <GetCategories 
                setCategories={setCategories}
            />
            : 
            <div className='w-full flex flex-row mt-12 mx-auto items-center justify-evenly h-full'>
                <div className='flex flex-col'>
                    {categories && categories.map( category => (
                        <Category 
                            key={category.id}
                            category={category}
                        />
                    ) )}
                </div>
                <CategoryChart 
                    categories={categories}
                />
                {open && 
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <CreateCategory 
                            setOpen={setOpen}
                        />
                    </Dialog>
                }

            </div>
        }

    </div>
  )
}

export default Categories