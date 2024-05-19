import InputText from "../../utils/InputText"
import Selector from "../../utils/Selector"
import CloseButton from "../../utils/CloseButton"
import { DialogPanel, Dialog, Select, SelectItem, Button } from "@tremor/react"
import { useState } from "react"

const AveragesForm = ({ open, setOpen, student, calification, setCalification, average }) => {

    const [description, setDescription] = useState(average?.description || '')
    const califications = ['AD', 'A', 'B', 'C']

    const handleClosePanel = () => {
        setOpen(false)
    }

    const handleSubmit = () => {

    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
{/* 
<div className="flex flex-col gap-4 w-[270px]">
       <Button onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{average ? 'Guardar' : 'Crear'}</Button> */}

            <CloseButton handleClose={handleClosePanel}/>
            <h3 className="text-white text-2xl text-center">{student}</h3>
            <div className="flex flex-col gap-4 w-[270px]">
                <p className="text-white font-poppins ml-4 text-lg text-center">Calificación</p>
                <Select value={calification} onValueChange={ value => setCalification(value)}>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="AD">AD</SelectItem>
                </Select>
            </div>
            <InputText 
                label={'Descripción'}
                value={description}
                setter={setDescription}
                textArea={true}
            />
            <Button onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{average ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

{/* <InputText 
label={'Descriptión'}
value={description}
setter={setDescription}
error={descriptionError}
errorMsg={"Se necesita el porcentaje para crear la categoría"}
textArea={true}
/> */}

export default AveragesForm