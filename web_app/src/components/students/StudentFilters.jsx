import { Select, SelectItem } from "@tremor/react"

const StudentFilters = () => {

    

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

export default StudentFilters