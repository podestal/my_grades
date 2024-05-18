import { DialogPanel, Select, SelectItem, Button ,Dialog } from "@tremor/react"
import { updateGrades } from "../../../api/api"
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import { useState } from "react"
import InputText from "../../../utils/InputText"

const UpdateGradeModal = ({ activity, student, setOpen, open, calification, setCalification, gradeId, forceConclusions, error, setError }) => {

    const { user } = useAuth()
    const [observations, setObservations] = useState('')
    const queryClient = useQueryClient()
    const { mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['students'])
            setOpen(false)},
        onError: err => console.log('Error',err)
    })

    const handleUpdate = () => {
        setError(false)
        if (forceConclusions && observations == '' && calification == 'C') {
            setError(true)
            return
        }
        updateGradesMutation({ token: user.access, gradeId, calification: { calification } })
    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogPanel className="relative flex flex-col gap-4">
            <h2 className="text-white text-3xl text-center">{activity}</h2>
            <h3 className="text-white text-xl text-center">{student}</h3>
            <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
            {/* {console.log('calification:', newCalification)} */}
            <Select value={calification} onValueChange={ value => setCalification(value)}>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="AD">AD</SelectItem>
            </Select>
            {console.log('error', error)}
            <InputText 
                value={observations}
                setter={setObservations}
                label={forceConclusions ? 'Conclusiones Descriptivas' : 'Observaciones'}
                error={error}
                errorMsg={'Conclusiones descriptivas son obligatorias para las notas C'}
                textArea={true}
                placeholder={'Conclusiones descriptivas'}
            />
            <div className="flex items-center justify-center my-4">
                <Button onClick={handleUpdate} className="" variant="secondary">Cambiar</Button>
            </div>
        </DialogPanel>
    </Dialog>
  )
}

export default UpdateGradeModal