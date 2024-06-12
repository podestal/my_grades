import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "../../api/api"
import { useState } from "react"
import CategoryForm from "./CategoryForm"
import useCategories from "../../hooks/useCategories"
import { Button } from "@tremor/react"
import useAuth from "../../hooks/useAuth"

const CreateCategory = () => {

    // USER
    const {user} = useAuth()

    // QUERY CLIENT
    const queryClient = useQueryClient()

    // PANEL CONDITIONALS
    const [open, setOpen] = useState(false)

    // CLEAR INPUTS
    const [clear, setClear] = useState(false)

    // ERROR HANDLING
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)

    // LOCAL STATE CATEGORIES
    const { categories, setCategories } = useCategories()

    // CREATE MUTATION
    const { mutate: createCategoryMutation } = useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => {
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido creada con éxito')
            console.log('res',res)
            queryClient.setQueryData(['categories'], (prev) => [...prev, res])
            // queryClient.setQueryData(['categories' ], prev => ([...prev, res]))
            // console.log('response', res.data)
            // const newData = [ ...queryClient.getQueryData(['categories']).data, res.data]
            // console.log('newData',newData)
            // queryClient.setQueryData(['categories'], prev => {
            //     prev.data.push({...res.data, user: user.id})
            //     return prev
            // })
            // queryClient.invalidateQueries(['categories'])
            // queryClient.setQueryData(['categories'], prev => ([ ...prev, res.data]))
            // categories.length > 0 
            // ? setCategories(prev => [...prev, res.data])
            // : setCategories([res.data])
            setTimeout(() => {
                setSuccess('')
            }, 2000)
        },
        onError: err => {
            setSuccess('')
            setError('Ocurrió un error, vuélvalo a intentar más tarde')
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    })

  return (
    <>
        <Button color='violet-950' onClick={() => setOpen(true)} className=' hover:bg-violet-900'>Crear Categoría</Button>
        {console.log('queryClient', queryClient.getQueryData(['categories']))}
        {/* {console.log('queryClient', queryClient.setQueryData(['categories'], prev => console.log([ ...prev])))} */}
        <CategoryForm 
            open={open}
            setOpen={setOpen}
            success={success}
            error={error}
            titleError={titleError}
            weightError={weightError}
            create={createCategoryMutation}
        />
    </>

  )
}

export default CreateCategory