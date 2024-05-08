import { Dialog, DialogPanel, Button } from "@tremor/react"
import GenericCallout from "../../utils/GenericCallout"
import CloseButton from "../../utils/CloseButton"
import useAuth from "../../hooks/useAuth"

const DeleteCategoryModal = ({ open, setOpen, deleteCat, categoryId, success, error }) => {

    // AUTH CREDENTIALS
    const { user } = useAuth()

    //DELETE HANDLER
    const handleDelete = () => {
        deleteCat({ token: user.access, categoryId })
    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            <CloseButton 
                setOpen={setOpen}
            />
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