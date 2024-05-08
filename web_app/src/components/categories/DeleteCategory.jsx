import { useMutation } from "@tanstack/react-query"
import { deleteCategory } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import useCategories from "../../hooks/useCategories"
import { Button } from "@tremor/react"

const DeleteCategory = ({ category }) => {

    // LOCAL CATEGORIES
    const { setCategories } = useCategories()

    // AUTH CREDENTIALS
    const { user } = useAuth()

    // DELETE MUTATION
    const { mutate: deleteCategoryMutation } = useMutation({
        mutationFn: data => deleteCategory(data),
        onSuccess: res => {
            console.log(res.data)
            setCategories( prevCats => prevCats.filter( prevCat => prevCat.id != category.id))
        },
        onError: err => console.log(err.message)
    })


    const handleDelete = () => {
        deleteCategoryMutation({ token: user.access, categoryId: category.id })
    }

  return (
    <Button onClick={handleDelete} color="red" className="mr-4">Borrar</Button>
  )
}

export default DeleteCategory