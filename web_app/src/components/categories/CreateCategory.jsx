import { DialogPanel, TextInput, Button, Callout } from "@tremor/react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { createCategory, updateCategory } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"

const CreateCategory = ({ setOpen, category }) => {

    const queryClient = useQueryClient()
    const [title, setTitle] = useState(category && category.title || '')
    const [weight, setWeight] = useState(category && category.weight * 100 || '')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)
    const { user } = useAuth()

    const { mutate: updateCategoryMutation } = useMutation({
        mutationFn: data => updateCategory(data),
        onSuccess: res => {
            console.log(res.data)
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido actualizada con éxito')
            queryClient.invalidateQueries(['categories'])
        }
    })

    const { mutate: createCategoryMutation } = useMutation({
        mutationFn: data => createCategory(data),
        onSuccess: res => {
            setError('')
            setTitleError(false)
            setWeightError(false)
            setSuccess('Su categoría ha sido creada con éxito')
            queryClient.setQueryData({
                keys: ['categories'],
                
            })
        },
        onError: err => {
            setSuccess('')
            setError(err.message)
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
    <DialogPanel className='relative flex flex-col items-center gap-4'>
        {error &&         
            <Callout title="Error" color='red'>
                {error}
            </Callout>
        }
        {success &&         
            <Callout title="Categoría Creada" color='teal'>
                {success}
            </Callout>
        }
        <h2 className="text-white text-3xl text-center mb-6">Nueva Categoría</h2>
        <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
        <TextInput 
            placeholder='Título ...' 
            className='w-[270px]' 
            value={title} onValueChange={value => setTitle(value)}
            error={titleError}
            errorMessage="Se necesita un título para crear la categoría"
        />
        <TextInput 
            type='number' 
            placeholder='Porcentaje...' 
            className='w-[270px]' 
            value={weight} 
            onValueChange={value => setWeight(value)}
            error={weightError}
            errorMessage="Se necesita el porcentaje para crear la categoría"
        />
        <Button color="blue" onClick={handleCreateUpdate}>{category ? 'Guardar' : 'Crear'}</Button>
    </DialogPanel>
  )
}

export default CreateCategory