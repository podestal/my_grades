import ParticipationForm from "./ParticipationForm"
import { createParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const CreateParticipation = ({ student, assignature, quarter }) => {

    const { mutate: createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })

  return (
    <ParticipationForm 
        student={student}
        assignature={assignature}
        create={createParticipationMutation}
        quarter={quarter}
    />
  )
}

export default CreateParticipation