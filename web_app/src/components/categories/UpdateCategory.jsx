import { useMutation } from "@tanstack/react-query"
import useCategories from "../../hooks/useCategories"
import CategoryForm from "./CategoryForm"
import { updateCategory } from "../../api/api"
import { useState } from "react"

const UpdateCategory = ({ open, setOpen, category }) => {

    // LOCAL CATEGORIES SETTER
    const { setCategories } = useCategories()

    // ERROR HANDLING
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)

    // UPDATE MUTATION
    const { mutate: updateCategoryMutation } = useMutation({
        mutationFn: data => updateCategory(data),
        onSuccess: res => {
            console.log(res.data)
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido actualizada con éxito')
            setCategories( prevCats => prevCats.map( prevCat => {
                if (prevCat.id == category.id) {
                    category.title = res.data.title
                    category.weight = res.data.weight
                }
                return prevCat
            }))
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
        category={category}
        update={updateCategoryMutation}
    />
  )
}

export default UpdateCategory