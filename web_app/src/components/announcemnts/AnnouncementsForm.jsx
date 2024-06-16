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
import GenericCallout from "../../utils/GenericCallout"
import AnnouncementImgs from "./AnnouncementImgs"

const AnnouncementsForm = ({ open, setOpen, announcement, create, update, clases, success, setSuccess, error, setError, disable, setDisable }) => {

    // const { clases } = useClases()
    const { user } = useAuth()

    const [title, setTitle] = useState(announcement?.title || '')
    const [description, setDescription] = useState(announcement?.description || '')
    const [selectedClase, setSelectedClase] = useState(announcement?.clase?.id || '')
    const currentQuarter = getCurrentQuarter()
    const [quarter, setQuarter] = useState(announcement?.quarter || currentQuarter.id)

    // VALIDATION
    const [titleValidator, setTitleValidator] = useState(false)
    const [descriptionValidator, setDescriptionValidator] = useState(false)
    const [claseValidator, setClaseValidator] = useState(false)


    const handleClosePanel = () => {
        setOpen(false)
        setSuccess(false)
        setError(false)
        setDisable(false)
        setTitle(announcement?.title || '')
        setDescription(announcement?.description || '')
        setSelectedClase(announcement?.clase || '')
        setQuarter(announcement?.quarter || currentQuarter.id)
    }

    const handleCreate = () => {

        setTitleValidator(false)
        setDescriptionValidator(false)
        setClaseValidator(false)

        if (title.length == 0) {
            setTitleValidator(true)
            return
        }

        if (description.length == 0) {
            setDescriptionValidator(true)
            return
        }

        if (selectedClase.length == 0) {
            setClaseValidator(true)
            return
        }

        setSuccess(false)
        setError(false)
        setDisable(false)
        create && create({ token: user.access, announcement: {
            title,
            description,
            quarter,
            clase: selectedClase,
        } })
        update && update({ token: user.access, announcementId: announcement.id, updates: {
            title,
            description,
            quarter,
            clase: selectedClase,
        } })
    }

  return (
        <Dialog
            open={open}
            onClose={() => handleClosePanel()}
        >
            <DialogPanel
                className="relative flex flex-col items-center gap-4 w-full"
            >
                <CloseButton 
                    handleClose={handleClosePanel}
                />
                {error && <GenericCallout conditionalMsg={'No se pudo crear el nuevo anuncio'} title={'Error'} color={'red'}/>}
                {success && <GenericCallout conditionalMsg={'Anuncio creado'} title={announcement ? 'Editar Anuncio' :'Nuevo Anuncio'} color={'teal'}/>}
                <h2 className="text-white mb-6 text-3xl text-center">{announcement ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h2>
                <InputText 
                    label='Título'
                    value={title}
                    setter={setTitle}
                    error={titleValidator}
                    errorMsg={'Para crear el anuncio, un título es necesario'}
                />
                <InputText 
                    label='Descripción'
                    value={description}
                    setter={setDescription}
                    textArea={true}
                    error={descriptionValidator}
                    errorMsg={'Para crear el anuncio, una descripción es necesaria'}
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
                    error={claseValidator}
                    errorMsg={'Para crear el anuncio, una clase es necesaria'}
                />
                {announcement &&
                <AnnouncementImgs 
                    images={announcement.annunciation_imgs}
                    form={true}
                />}
                <Button disabled={disable} onClick={handleCreate} className="w-[160px] mx-auto mt-6" color="blue">{announcement ? 'Guardar' : 'Crear'}</Button>
            </DialogPanel>
        </Dialog>
  )
}

export default AnnouncementsForm