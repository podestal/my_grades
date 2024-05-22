import ParticipationForm from "./ParticipationForm"
import { createParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const CreateParticipation = ({ student, assignature, quarter }) => {

    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { mutate: createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => {
            console.log(res.data)
            setDisable(true)
            setSuccess(true)
            setError(false)
            setTimeout(() => {
                setDisable(false)
            }, 3000)
        },
        onError: err => {
            setSuccess(false)
            setError(true)
        }
    })

  return (
    <ParticipationForm 
        student={student}
        assignature={assignature}
        create={createParticipationMutation}
        quarter={quarter}
        disable={disable}
        error={error}
        success={success}
    />
  )
}

export default CreateParticipation