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
import CategoryForm from '../../components/categories/CategoryForm'
import CategoriesBody from '../../components/categories/CategoriesBody'
import NoContent from '../../utils/NoContent'

const Categories = () => {

    // LOCAL CATEGORIES
    const { categories, setCategories } = useCategories()


  return (
    <div className='min-h-[100vh]'>
        <div className='flex items-center justify-center gap-12 w-full'>
            <h2 className={`my-12 ${styles.gradientTitle}`}>Categorías</h2>
            <CreateCategory />
        </div>
        {
            categories.length == 0 
            ? 
            <>
                <GetCategories 
                    setCategories={setCategories}
                />
                <NoContent />
            </>
            : 
            <CategoriesBody 
                categories={categories}
            />
        }

    </div>
  )
}

export default Categories