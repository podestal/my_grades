import { Dialog, DialogPanel, Button } from "@tremor/react"
import { useState } from "react"

import CloseButton from "../../utils/CloseButton"
import InputText from "../../utils/InputText"
import GenericCallout from "../../utils/GenericCallout"
import useAuth from "../../hooks/useAuth"

const CategoryForm = ({ open, setOpen, category, success, error, create, update }) => {

    // AUTH CREDENTIALS
    const { user } = useAuth()

    // IMPORTANT FIELDS TO CREATE CATEGORY
    const [title, setTitle] = useState(category && category.title || '')
    const [weight, setWeight] = useState(category && category.weight * 100 || '')

    // VALIDATION FIELDS
    const [titleError, setTitleError] = useState(false)
    const [weightError, setWeightError] = useState(false)

    const handleClosePanel = () => {
        if (create) {
            setTitle('')
            setWeight('')
        } 
        setOpen(false)
    }

    // CREATE/UPDATE HANDLER
    const handleSubmit = () => {

        // SET ERRORS TO FALSE
        setTitleError(false)
        setWeightError(false)

        // INPUTS VALIDATION
        if (title.length == 0) {
            setTitleError(true)
            return
        }

        if (weight == 0) {
            setWeightError(true)
            return
        }

        // CREATE MUTATION
        create && create({ token: user.access, category: {
            title,
            weight: (weight/100).toFixed(2),
        }})

        // UPDATE MUTATION
        update && update({ token: user.access, categoryId: category.id, updates: {
            title,
            weight: (weight/100).toFixed(2),
        }})

    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
            <GenericCallout conditionalMsg={error} title={'Error'} color={'red'}/>
            <GenericCallout conditionalMsg={success} title={category ? 'Categoría editada' :'Categoría creada'} color={'teal'}/>
            <CloseButton handleClose={handleClosePanel}/>
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
            <Button onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{category ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default CategoryForm