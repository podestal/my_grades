import { useMutation } from "@tanstack/react-query"
import { createCategory } from "../../api/api"
import { useState } from "react"
import CategoryForm from "./CategoryForm"
import useCategories from "../../hooks/useCategories"

const CreateCategory = ({ open, setOpen }) => {

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
            categories.length > 0 
            ? setCategories(prev => [...prev, res.data])
            : setCategories(res.data)
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
    <CategoryForm 
        open={open}
        setOpen={setOpen}
        success={success}
        error={error}
        titleError={titleError}
        weightError={weightError}
        create={createCategoryMutation}
    />
  )
}

export default CreateCategory