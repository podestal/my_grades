import { DialogPanel, Select, SelectItem, Button } from "@tremor/react"
import { updateGrades } from "../../../api/api"
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import { useState } from "react"

const UpdateGradeModal = ({ activity, student, setOpen, calification, gradeId }) => {

    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [newCalification, setNewCalification] = useState(calification && calification || '')
    const { mutate: updateGradesMutation } = useMutation({
        mutationFn: data => updateGrades(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['students'])
            setOpen(false)},
        onError: err => console.log('Error',err)
    })

    const handleUpdate = () => {
        updateGradesMutation({ token: user.access, gradeId, calification: { calification: newCalification} })
    }

  return (
    <DialogPanel className="relative flex flex-col gap-4">
        <h2 className="text-white text-3xl text-center">{activity}</h2>
        <h3 className="text-white text-xl text-center">{student}</h3>
        <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
        <Select defaultValue={newCalification} value={newCalification} onValueChange={ value => setNewCalification(value)}>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="AD">AD</SelectItem>
        </Select>
        <div className="flex items-center justify-center my-4">
            <Button onClick={handleUpdate} className="" variant="secondary">Cambiar</Button>
        </div>
    </DialogPanel>
  )
}

export default UpdateGradeModal