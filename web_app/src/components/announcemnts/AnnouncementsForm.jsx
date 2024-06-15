import { Dialog, DialogPanel, Button } from "@tremor/react"
import { useState } from "react"
import CloseButton from "../../utils/CloseButton"
import InputText from "../../utils/InputText"
import useClases from "../../hooks/useClases"
import Selector from "../../utils/Selector"
import useAuth from "../../hooks/useAuth"
import {getCurrentQuarter} from "../../data/currentQuarter"
import { quartersData } from "../../data/quarters"
import { getClasesForInstructors } from "../../data/getClasesForInstructors"

const AnnouncementsForm = ({ open, setOpen, announcement, create, clases }) => {

    // const { clases } = useClases()
    const { user } = useAuth()

    const [title, setTitle] = useState(announcement && announcement.title || '')
    const [description, setDescription] = useState(announcement && announcement.description || '')
    const [selectedClase, setSelectedClase] = useState(announcement && announcement.clase || '')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(currentQuarter)

    const handleClosePanel = () => {
        setOpen(false)
    }

    const handleCreate = () => {
        create({ token: user.access, announcement: {
            title,
            description,
            clase: selectedClase,
        } })
    }

  return (
        <Dialog
            open={open}
            onClose={() => handleClosePanel()}
        >
            <DialogPanel
                className="relative flex flex-col items-center gap-4"
            >
                <CloseButton 
                    handleClose={handleClosePanel}
                />
                <h2 className="text-white mb-6 text-3xl text-center">{announcement ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h2>
                <InputText 
                    label='Título'
                    value={title}
                    setter={setTitle}
                />
                <InputText 
                    label='Descripción'
                    value={description}
                    setter={setDescription}
                />
                <Selector 
                    label={'Bimestre'}
                    value={quarter}
                    setter={setQuarter}
                    items={quartersData}
                />
                <Selector 
                    label={'Clases'}
                    value={selectedClase}
                    setter={setSelectedClase}
                    items={clases}
                />
                <Button onClick={handleCreate} className="w-[160px] mx-auto mt-6" color="blue">{announcement ? 'Guardar' : 'Crear'}</Button>
            </DialogPanel>
        </Dialog>
  )
}

export default AnnouncementsForm