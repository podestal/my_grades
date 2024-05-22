import ParticipationForm from "./ParticipationForm"
import { useState } from "react"

const UpdateParticipation = ({ student, assignature, quarter, participation }) => {

    // ERROR/SUCCESS HANDLING
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

  return (
    // <>
    //     {console.log('participation from update', participation)}
    // </>
    <ParticipationForm 
        student={student}
        assignature={assignature}
        quarter={quarter}
        disable={disable}
        error={error}
        success={success}
        participation={participation}
    />
  )
}

export default UpdateParticipation