import { Dialog, DialogPanel, Button } from "@tremor/react"
import { useState } from "react"
import CloseButton from "../../utils/CloseButton"
import InputText from "../../utils/InputText"
import useClases from "../../hooks/useClases"
import Selector from "../../utils/Selector"

const AnnouncementsForm = ({ open, setOpen, announcement }) => {

    const { clases } = useClases()

    const [title, setTitle] = useState(announcement && announcement.title || '')
    const [description, setDescription] = useState(announcement && announcement.description || '')
    const [selectedClase, setSelectedClase] = useState(announcement && announcement.clase || '')

    const handleCreate = () => {

    }

  return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogPanel
                className="relative flex flex-col gap-4"
            >
                <CloseButton 
                    setOpen={setOpen}
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

{/* <Select value={selectedQuarter} onValueChange={ value => setSelectedQuarter(value)}>
<SelectItem value="Q1">B1</SelectItem>
<SelectItem value="Q2">B2</SelectItem>
<SelectItem value="Q3">B3</SelectItem>
<SelectItem value="Q4">B4</SelectItem>
</Select> */}

export default AnnouncementsForm