import { Textarea, Button } from "@tremor/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { updateGrades } from "../../api/api"

const ObservationsForm = ({ observations, gradeId, setSuccess, setError, setSuccessMsg  }) => {

    const [obs, setObs] = useState(observations && observations || '')
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const { mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['grades'])
            setError(false)
            setSuccess(true)
            setSuccessMsg('Observación agregada')
        },
        onError: err => {
            setSuccess(false)
            setError(true)}
    })

    const handleUpdate = () => {
        updateGradesMutation({ token: user.access, gradeId, calification: { observations: obs }})
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 2000)
    }

  return (
    <div className="text-sm grid col-span-3">
        <div className="flex justify-center items-center">
            <Textarea className="h-[100px]" placeholder="Agregar Observaciones" value={obs} onValueChange={value => setObs(value)} onDoubleClick={() => alert('clicked')}/>
            <Button onClick={handleUpdate} color="violet-950" className="ml-6 hover:bg-violet-900">{observations ? 'Guardar Observación' : 'Agregar Observación'}</Button>
        </div>
    </div>
  )
}

export default ObservationsForm