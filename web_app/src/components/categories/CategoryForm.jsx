import { Dialog, DialogPanel, Button } from "@tremor/react"
import { useState } from "react"

import CloseButton from "../../utils/CloseButton"
import InputText from "../../utils/InputText"
import GenericCallout from "../../utils/GenericCallout"
import useAuth from "../../hooks/useAuth"

const CategoryForm = ({ open, setOpen, category, success, error, create }) => {

    // AUTH CREDENTIALS
    const { user } = useAuth()

    // IMPORTANT FIELDS TO CREATE CATEGORY
    const [title, setTitle] = useState(category && category.title || '')
    const [weight, setWeight] = useState(category && category.weight * 100 || '')

    // VALIDATION FIELDS
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)

    // CREATE HANDLER
    const handleCreate = () => {

        // SET ERRORS TO FALSE
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

        // Mutate
        create({ token: user.access, category: {
            title,
            weight: weight/100,
        }})

        // EMPTYING INPUT DATA
        if (success) {
            setTitle('')
            setWeight('')
        }
    }

    const handleUpdate = () => {

    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
            <GenericCallout conditionalMsg={error} title={'Error'} color={'red'}/>
            <GenericCallout conditionalMsg={success} title={category ? 'Categoría editada' :'Categoría creada'} color={'teal'}/>
            <CloseButton 
                setOpen={setOpen}
            />
            <h2 className="text-white mb-6 text-3xl text-center">{category ? 'Editar Categoría' : 'Nuevo Categoría'}</h2>
            <InputText 
                label={'Título'}
                value={title}
                setter={setTitle}
                error={titleError}
                errorMsg={"Se necesita un título para crear la categoría"}
            />
            <InputText 
                label={'Porcentaje'}
                value={weight}
                setter={setWeight}
                error={weightError}
                errorMsg={"Se necesita el porcentaje para crear la categoría"}
            />
            <Button onClick={handleCreate} className="w-[160px] mx-auto mt-6" color="blue">{category ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default CategoryForm