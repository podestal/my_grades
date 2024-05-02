import { useState } from "react"
import CalificationSelector from "./CalificationSelector"
import ObservationsForm from "./ObservationsForm"
import { RiCheckLine, RiBugLine } from "@remixicon/react"
import { Badge } from "@tremor/react"

const Grade = ({ grade }) => {

    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState(false)

  return (
    <div className="mt-8">
        <div className="w-full flex justify-center">
            {success && <Badge className="mx-8 mb-6 w-[200px]" color='green' icon={RiCheckLine}>{successMsg}</Badge>} 
            {error && <Badge className="mx-8 mb-6 w-[140px]" color='red' icon={RiBugLine}>Ocurrió un error</Badge>} 
        </div>
        <div className="my-8  grid grid-cols-6">
            <div className="col-span-2 flex items-center">
                <p className='text-xl'>{grade.student.first_name} {grade.student.last_name}</p>
            </div>
            <CalificationSelector 
                calification={grade.calification}
                gradeId={grade.id}
                setError={setError}
                setSuccess={setSuccess}
                setSuccessMsg={setSuccessMsg}
            />
            <ObservationsForm 
                observations={grade.observations}
                gradeId={grade.id}
                setError={setError}
                setSuccess={setSuccess}
                setSuccessMsg={setSuccessMsg}
            />
        </div>
    </div>
  )
}

export default Grade