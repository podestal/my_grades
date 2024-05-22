import ParticipationForm from "./ParticipationForm"
import { useState } from "react"
import { updateParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const UpdateParticipation = ({ student, assignature, quarter, participation }) => {

    // ERROR/SUCCESS HANDLING
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // UPDATE PARTICIPATION
    const { mutate: updateParticipationMutation } = useMutation({
        mutationFn: data => updateParticipation(data),
        onSuccess: res => {
            console.log(res.data)
            setDisable(true)
            setSuccess(true)
            setError(false)
        },
        onError: err => {
            setSuccess(false)
            setError(true)
            console.log(err)}
    })

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
        update={updateParticipationMutation}
    />
  )
}

export default UpdateParticipation