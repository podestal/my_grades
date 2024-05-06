import useAssignatures from "../../hooks/useAssignatures"
import { Select, SelectItem } from "@tremor/react"

const AssignatureSelector = ({ assignature, setAssignature }) => {

    const { assignatures } = useAssignatures()

  return (
    <div className="flex flex-col justify-center items-center">
        <p className="mb-8 font-poppins text-md">Seleccione un curso</p>
        <Select value={assignature} onValueChange={ value => setAssignature(value)} className="w-[400px] mx-auto">
            {assignatures.map( curso => (
                <SelectItem key={curso.id} value={curso.id} >{curso.title}</SelectItem>
            ))}
        </Select>
    </div>
  )
}

export default AssignatureSelector