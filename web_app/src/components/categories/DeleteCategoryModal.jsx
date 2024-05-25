import { Dialog, DialogPanel, Button } from "@tremor/react"
import GenericCallout from "../../utils/GenericCallout"
import CloseButton from "../../utils/CloseButton"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"

const DeleteCategoryModal = ({ open, setOpen, deleteCat, category, success, error }) => {

    // ERROR HANDLER
    const [cannotDelete, setCannotDelete] = useState(false)

    // AUTH CREDENTIALS
    const { user } = useAuth()

    const handleClosePanel = () => {
        setOpen(false)
        setCannotDelete(false)
    }

    //DELETE HANDLER
    const handleDelete = () => {
        setCannotDelete(false)
        console.log('category title', category.title)
        if (category.title == 'Participaciones') {
            setCannotDelete(true)
            return
        }
        // deleteCat({ token: user.access, categoryId: category.id })
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            <CloseButton handleClose={handleClosePanel} />
            {cannotDelete && <GenericCallout conditionalMsg={'No se puede borrar la categoría Participaciones'} title={'Error'} color={'red'}/>}
            <GenericCallout conditionalMsg={error} title={'Error'} color={'red'}/>
            <GenericCallout conditionalMsg={success} title={'Categoría eliminada'} color={'teal'}/>
            <h2 className="text-white mb-6 text-3xl text-center">Está seguro de eliminar?</h2>
            <div className="w-full flex gap-8 justify-center">
                <Button onClick={() => setOpen(false)} color="blue">Cancelar</Button>
                <Button onClick={handleDelete} color="red">Eliminar</Button>
            </div>
        </DialogPanel>
    </Dialog>
  )
}

export default DeleteCategoryModal