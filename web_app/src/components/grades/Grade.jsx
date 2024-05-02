import { useState } from "react"
import CalificationSelector from "./CalificationSelector"

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
        <p className='text-sm grid col-span-3'>{grade.observations ? grade.observations : '-'}</p>
    </div>
  )
}

export default Grade