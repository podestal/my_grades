import ParticipationForm from "./ParticipationForm"
import { useState } from "react"
import { updateParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useStudent from "../../hooks/useStudents"

const UpdateParticipation = ({ student, assignature, quarter, participation }) => {

    // ERROR/SUCCESS HANDLING
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // LOCAL STATE STUDENT
    const {students, setStudents} = useStudent()

    // UPDATE PARTICIPATION
    const { mutate: updateParticipationMutation } = useMutation({
        mutationFn: data => updateParticipation(data),
        onSuccess: res => {
            console.log(res.data)
            setDisable(true)
            setSuccess(true)
            setError(false)
            const studentFound = students.find( localStudent => localStudent.id == student.id)
            studentFound.participations = studentFound.participations.map( singleParticipation => {
                if (singleParticipation.id == participation.id) {
                    singleParticipation = res.data
                }
                return singleParticipation
            })
            setStudents( students => students.map( localStudent => {
                if (localStudent.id == student.id) {
                    localStudent = studentFound
                }
                return localStudent
            }))
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