import { DialogPanel, TextInput, Button, Callout } from "@tremor/react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { createCategory, updateCategory } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import CategoryForm from "./CategoryForm"
import useCategories from "../../hooks/useCategories"

const CreateCategory = ({ open, setOpen, category }) => {

    const queryClient = useQueryClient()
    const [title, setTitle] = useState(category && category.title || '')
    const [weight, setWeight] = useState(category && category.weight * 100 || '')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)
    const { user } = useAuth()

    // LOCAL STATE CATEGORIES
    const { categories, setCategories } = useCategories()

    const { mutate: updateCategoryMutation } = useMutation({
        mutationFn: data => updateCategory(data),
        onSuccess: res => {
            console.log(res.data)
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido actualizada con éxito')
        }
    })

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
            setError(err.message)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    })

    const handleCreateUpdate = () => {
        
        setTitleError(false)
        setWeightError(false)
        if (title.length == 0) {
            setTitleError(true)
            return
        }

        if (weight == 0) {
            setWeightError(true)
            return
        }

        if (category) {
            updateCategoryMutation({ token: user.access, categoryId: category.id, updates: {
                title,
                weight: weight/100,
            }})
        } else {
            createCategoryMutation({ token: user.access, category: {
                title,
                weight: weight/100,
            }})
        }
    }

  return (
<>
{console.log('Catagrories', categories)}
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