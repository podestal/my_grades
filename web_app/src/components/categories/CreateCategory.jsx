import { DialogPanel, TextInput, Button } from "@tremor/react"
import { useMutation } from "@tanstack/react-query"
import { createCategory } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"

const CreateCategory = ({ setOpen }) => {

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState(0)
    const { user } = useAuth()
    const { mutate: createCategoryMutation } = useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => console.log('Response',res.data),
        onError: err => console.log('error', err)
    })

    const handleCreate = () => {
        createCategoryMutation({ token: user.access, category: {} })
    }

  return (
    <DialogPanel className='relative flex flex-col items-center gap-4'>
        <h2 className="text-white text-3xl text-center mb-6">Nueva Categoría</h2>
        <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
        <TextInput placeholder='Título ...' className='w-[270px]'/>
        <TextInput type='number' placeholder='Porcentaje...' className='w-[270px]'/>
        <Button onClick={handleCreate}>Crear</Button>
    </DialogPanel>
  )
}

export default CreateCategory