import { Text } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import ParticipationForm from "./ParticipationForm"
import { createParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const CreateParticipation = ({ route }) => {

    const assignature = route?.params?.assignature
    const student = route?.params?.student
    const { mutate: createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => console.log('RES',res.data),
        onError: err => console.log(err)
    })

  return (
    <NonScrollableContainer>
        <ParticipationForm 
            assignature={assignature}
            student={student}
            create={createParticipationMutation}
        />
    </NonScrollableContainer>

  )
}

export default CreateParticipation