import InputText from "../../utils/InputText"
import Selector from "../../utils/Selector"
import useAuth from "../../hooks/useAuth"
import CloseButton from "../../utils/CloseButton"
import { DialogPanel, Dialog, Select, SelectItem, Button } from "@tremor/react"
import { useState } from "react"

const AveragesForm = ({ open, setOpen, student, studentId, calification, setCalification, average, selectedCompetency, quarter, assignature, create, update, averageId }) => {

    // AUTH
    const { user } = useAuth()

    const [conclusion, setConclusion] = useState(average?.conclusion || '')

    const handleClosePanel = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        create && create({ token: user.access, quarterGrade:{
            calification,
            quarter,
            competence: selectedCompetency,
            conclusion,
            assignature: assignature.id,
            student: studentId,
        }})

        update && update({ token: user.access, averageId, updates: {
            calification,
            conclusion,
        }})
    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
            {console.log('averageId', averageId)}
            <CloseButton handleClose={handleClosePanel}/>
            <h3 className="text-white text-2xl text-center">{student}</h3>
            <div className="flex flex-col gap-4 w-[270px]">
                {console.log('studentId', studentId)}
                <p className="text-white font-poppins ml-4 text-lg text-center">Calificación</p>
                <Select value={calification} onValueChange={ value => setCalification(value)}>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="AD">AD</SelectItem>
                </Select>
            </div>
            <InputText 
                label={'Conclusión'}
                value={conclusion}
                setter={setConclusion}
                textArea={true}
            />
            <Button onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{average ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default AveragesForm