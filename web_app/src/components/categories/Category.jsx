import { Button, Dialog } from "@tremor/react"
import { useState } from "react"
import CreateCategory from "./CreateCategory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { deleteCategory } from "../../api/api"
import UpdateCategory from "./UpdateCategory"

const Category = ({ category }) => {

    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const { mutate: deleteCategoryMutation } = useMutation({
        mutationFn: data => deleteCategory(data),
        onSuccess: res => {
            console.log(res.data)
            queryClient.invalidateQueries(['categories'])
        },
        onError: err => console.log(err.message)
    })

    const handleDelete = () => {
        deleteCategoryMutation({ token: user.access, categoryId: category.id })
    }

  return (
    <>
        <div className="flex w-[520px] gap-8 my-4 ">
            <Button onClick={handleDelete} color="red" className="mr-4">Borrar</Button>
            <Button onClick={() => setOpen(true)} color='blue' className="mr-4">Editar</Button>
            <div className='w-full flex justify-between items-center'>
                <p className='text-white font-poppins text-xl'>{category.title}</p>
                <p className='text-white font-poppins'>{category.weight ? `${category.weight * 100}%` : '-'}</p>
            </div>
        </div>
        <UpdateCategory    
            open={open}
            setOpen={setOpen}
            // create={createCategoryMutation}
            category={category}
        />
    </>
  )
}

export default Category