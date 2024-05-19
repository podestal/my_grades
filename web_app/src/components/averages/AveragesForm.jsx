import InputText from "../../utils/InputText"
import Selector from "../../utils/Selector"
import useAuth from "../../hooks/useAuth"
import CloseButton from "../../utils/CloseButton"
import { DialogPanel, Dialog, Select, SelectItem, Button } from "@tremor/react"
import GenericCallout from "../../utils/GenericCallout"

const AveragesForm = ({ open, setOpen, student, studentId, calification, setCalification, average, selectedCompetency, quarter, assignature, create, update, averageId, conclusion, setConclusion, success, setSuccess, setError, error, disable, setDisable }) => {

    // AUTH
    const { user } = useAuth()

    const handleClosePanel = () => {

        setOpen(false)
        setError(false)
        setSuccess(false)
        setDisable(false)
    }

    const handleSubmit = () => {

        setError(false)
        setSuccess(false)
        if (calification == 'C' && conclusion == '') {
            setError(true)
            return
        }
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
        onClose={handleClosePanel}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
            <CloseButton handleClose={handleClosePanel}/>
            {error && <GenericCallout conditionalMsg={'Ocurrión un error'} title={'Error'} color={'red'}/>}
            {success && <GenericCallout conditionalMsg={'Su promedio se guardó con éxito'} title={update ? 'Actividad editada' :'Actividad creada'} color={'teal'}/>}
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
                error={error}
                errorMsg={'La conclusión es obligatoria cuando la nota es C'}
            />
            <Button disabled={disable} onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{update ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default AveragesForm