import AveragesForm from "./AveragesForm"
import { updateQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useStudent from "../../hooks/useStudents"
import { useState } from "react"

const UpdateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature, averageId, conclusion, setConclusion }) => {


    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const [disable, setDisable] = useState(false)

    const { students, setStudents } = useStudent()
    const { mutate: updateQuarterGradeMutation } = useMutation({
        mutationFn: data => updateQuarterGrade(data),
        onSuccess: res => {
            setDisable(true)
            setSuccess(true)
            setError(false)
            const studentFound = students.find(student => student.id == studentId)
            studentFound.averages = studentFound.averages.map( average => {
                if (average.id == averageId) {
                    average = res.data
                }
                return average
            })
            setStudents( students => students.map( student => {
              if (student.id == studentId) {
                student = studentFound
              }
              return student
            }))},
        onError: err => {
            setSuccess(false)
            setError(true)
            console.log(err)}
    })
  
    return (
    < AveragesForm
        open={open}
        setOpen={setOpen}
        student={student}
        studentId={studentId}
        calification={calification}
        setCalification={setCalification}
        selectedCompetency={selectedCompetency}
        quarter={quarter}
        assignature={assignature}
        update={updateQuarterGradeMutation}
        averageId={averageId}
        conclusion={conclusion}
        setConclusion={setConclusion}
        success={success}
        setSuccess={setSuccess}
        error={error}
        setError={setError}
        disable={disable}
        setDisable={setDisable}
    />
  )
}

export default UpdateAverage