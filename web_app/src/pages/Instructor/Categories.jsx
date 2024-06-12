import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../api/api'
import useAuth from '../../hooks/useAuth'
import Category from '../../components/categories/Category'
import { TextInput, Button, Dialog, DialogPanel } from '@tremor/react'
import CreateCategory from '../../components/categories/CreateCategory'
import Loading from '../../utils/Loading'
import CategoryChart from '../../components/categories/CategoryChart'
import useCategories from '../../hooks/useCategories'
import GetCategories from '../../components/getters/GetCategories'
import { styles } from '../../utils/styles'
import CategoryForm from '../../components/categories/CategoryForm'
import CategoriesBody from '../../components/categories/CategoriesBody'
import NoContent from '../../utils/NoContent'
import { useCategoriesQuery } from '../../tanstack/Categories'

const Categories = () => {

    const { user } = useAuth()
    const { data: categories, isLoading, isError, error, isSuccess } = useCategoriesQuery(user)

    if (isLoading) return <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>Loading ...</p>

    if (isError) return  <p className='text-white flex w-full text-2xl h-[100vh] justify-center items-center'>{error}</p>

    if (isSuccess) return (
        <div className='min-h-[100vh] w-[90%]'>
        <div className='flex items-center justify-center gap-12 w-full'>
            <h2 className={`mt-6 ${styles.gradientTitle}`}>Categorías</h2>
            <CreateCategory />
        </div>
        <CategoriesBody 
            categories={categories}
        />
    </div>
    )

}

export default Categories