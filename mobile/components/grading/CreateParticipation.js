import { Text } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import ParticipationForm from "./ParticipationForm"

const CreateParticipation = ({ route }) => {

    const assignature = route?.params?.assignature
    const student = route?.params?.student

  return (
    <NonScrollableContainer>
        <ParticipationForm 
            assignature={assignature}
            student={student}
        />
    </NonScrollableContainer>

  )
}

export default CreateParticipation