import { useMutation } from "@tanstack/react-query"
import { deleteCategory } from "../../api/api"
import { useState } from "react"
import useCategories from "../../hooks/useCategories"
import { Button } from "@tremor/react"
import DeleteCategoryModal from "./DeleteCategoryModal"

const DeleteCategory = ({ category }) => {
    
    // PANEL CONDITIONALS
    const [open, setOpen] = useState(false)

    // LOCAL CATEGORIES
    const { setCategories } = useCategories()

    // ERROR HANDLING
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // DELETE MUTATION
    const { mutate: deleteCategoryMutation } = useMutation({
        mutationFn: data => deleteCategory(data),
        onSuccess: res => {
            setCategories( prevCats => prevCats.filter( prevCat => prevCat.id != category.id))
            setSuccess('Su categoría ha sido creada con éxito')
            setError('')
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
        <Button onClick={() => setOpen(true)} color="red" className="mr-4">Borrar</Button>
        <DeleteCategoryModal 
            open={open}
            setOpen={setOpen}
            success={success}
            error={error}
            deleteCat={deleteCategoryMutation}
            category={category}
        />
    </>
  )
}

export default DeleteCategory