import ParticipationForm from "./ParticipationForm"
import { createParticipation } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import useStudent from "../../hooks/useStudents"

const CreateParticipation = ({ student, assignature, quarter }) => {

    // ERROR/SUCCESS HANDLING
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { students, setStudents } = useStudent()
// const studentFound = students.find(student => student.id == studentId)
    // studentFound.averages = studentFound.averages.length > 0 ? [...studentFound.averages, res.data] : [res.data]
    // setStudents( students => students.map( student => {
    //   if (student.id == studentId) {
    //     student = studentFound
    //   }
    //   return student
    // }))

    const { mutate: createParticipationMutation } = useMutation({
        mutationFn: data => createParticipation(data),
        onSuccess: res => {
            setDisable(true)
            setSuccess(true)
            setError(false)
            setTimeout(() => {
                setDisable(false)
            }, 4000)
            const studentFound = students.find( localStudent => localStudent.id == student.id)
            studentFound.participations = studentFound.participations.length > 0 ? [...studentFound.participations, res.data] : [res.data]
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