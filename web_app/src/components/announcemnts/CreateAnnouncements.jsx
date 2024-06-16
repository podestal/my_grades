import { Button, Dialog, DialogPanel } from "@tremor/react"
import { useState } from "react"
import AnnouncementsForm from "./AnnouncementsForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnnouncement } from "../../api/api"
import useAnnouncements from "../../hooks/useAnnouncements"
import { getClasesIds, getClasesForInstructors } from "../../data/getClasesForInstructors"
import CloseButton from "../../utils/CloseButton"
import CreateImageForm from "./CreateImageForm"

const CreateAnnouncements = ({clases, assignatures}) => {

    const queryClient = useQueryClient()

    // MODAL CONTROLLERS
    const [open, setOpen] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openImgForm, setOpenImgForm] = useState(false)

    const clasesIds = getClasesIds(assignatures)
    const filteredClases = getClasesForInstructors(clases, clasesIds)

    // ERROR HANDLING
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [disable, setDisable] = useState(false)

    //NEW ANNOUNCMENT
    const [newAnnouncement, setNewAnnouncement] = useState({})

    const { setAnnouncements } = useAnnouncements()

    const { mutate: createAnnouncementMutation } = useMutation({
        mutationFn: data => createAnnouncement(data),
        onSuccess: res => {
            setAnnouncements( prev => [...prev, res.data])
            queryClient.invalidateQueries(['announcements'])
            setError(false)
            setSuccess(true)
            setDisable(true)
            setOpen(false)
            setOpenConfirm(true)
            setNewAnnouncement(res)
        },
        onError: err => {
            setError(true)
            setSuccess(false)
            setDisable(false)
            setOpenConfirm(false)
        },
    })

  return (
    <div>
        <Button
            color='violet-950' 
            onClick={() => setOpen(true)}
        >Nuevo Anuncio</Button>
        <AnnouncementsForm 
            open={open}
            setOpen={setOpen}
            create={createAnnouncementMutation}
            clases={filteredClases}
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            disable={disable}
            setDisable={setDisable}
        />
        <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
        >
            <DialogPanel className="flex flex-col gap-6">
                <CloseButton handleClose={() => setOpenConfirm(false)}/>
                <p className="text-white font-montserrat text-center text-2xl">Su anuncio ha sido creado con éxito, desea adjuntar imágenes?</p>
                <div className="w-full flex justify-center items-center gap-12 my-8">
                    <Button onClick={() => {
                        setOpenConfirm(false)
                        setOpenImgForm(true)}} className="px-10 font-bold" size="xl" color="blue">Si</Button>
                    <Button onClick={() => setOpenConfirm(false)} className="px-10 font-bold" size="xl" color="red">No</Button>
                </div>
            </DialogPanel>
        </Dialog>
        <CreateImageForm 
            open={openImgForm}
            setOpenImgForm={setOpenImgForm}
            announcement={newAnnouncement}
        />
    </div>
  )
}

export default CreateAnnouncements