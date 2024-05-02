import { useState } from "react"
import CalificationSelector from "./CalificationSelector"
import ObservationsForm from "./ObservationsForm"

const Grade = ({ grade }) => {

    const [calification, setCalification] = useState(grade && grade.calification || "")

  return (
    <div className="my-8  grid grid-cols-6">
        <p className='text-xl w-[540px] col-span-2'>{grade.student.first_name} {grade.student.last_name}</p>
        <CalificationSelector 
            calification={calification}
            setCalification={setCalification}
            gradeId={grade.id}
        />
        <ObservationsForm 
            observations={grade.observations}
            gradeId={grade.id}
        />
    </div>
  )
}

export default Grade