import { Text } from "react-native"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import ParticipationForm from "./ParticipationForm"
import { createParticipation } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ErrorMsg from "../utils/ErrorMsg"
import SuccessMsg from "../utils/SuccessMsg"
import { useState } from "react"

const CreateParticipation = ({ route }) => {

    // ERROR HANDLING
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // QUERY CLIENT
    const queryClient = useQueryClient()

    // ROUTE PARAMS
    const assignature = route?.params?.assignature
    const student = route?.params?.student


    const { mutate: createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => {
            // queryClient.invalidateQueries()
            console.log('RES',res.data)
            setSuccess(true)
            setError(false)
        },
        onError: err => {
            setSuccess(false)
            setError(true)
            console.log(err)}
    })

  return (
    <NonScrollableContainer>
        {success && <SuccessMsg>Participación creada con éxito</SuccessMsg>}
        {error && <ErrorMsg>Ocurrió un error, vuélvalo a intentar más tarde</ErrorMsg>}
        <ParticipationForm 
            assignature={assignature}
            student={student}
            create={createParticipationMutation}
            success={success}
        />
    </NonScrollableContainer>

  )
}

export default CreateParticipation