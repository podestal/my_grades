import { useMutation, useQueryClient } from "@tanstack/react-query"
import useCategories from "../../hooks/useCategories"
import CategoryForm from "./CategoryForm"
import { updateCategory } from "../../api/api"
import { useState } from "react"
import { Button } from "@tremor/react"

const UpdateCategory = ({ category }) => {

    // QUERY CLIENT
    const queryClient = useQueryClient()

    // PANEL CONDITIONALS
    const [open, setOpen] = useState(false)

    // ERROR HANDLING
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)

    // UPDATE MUTATION
    const { mutate: updateCategoryMutation } = useMutation({
        mutationFn: data => updateCategory(data),
        onSuccess: res => {
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido actualizada con éxito')
            queryClient.setQueryData(['categories'], prevCats => prevCats.map( prevCat => {
                if (prevCat.id == category.id) {
                    prevCat = {...prevCat, ...res}
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
    <>
        <Button onClick={() => setOpen(true)} color='blue' className="mr-4">Editar</Button>
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
    </>
  )
}

export default UpdateCategory