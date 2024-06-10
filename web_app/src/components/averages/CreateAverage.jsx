import { createQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import AveragesForm from "./AveragesForm"
import useStudent from "../../hooks/useStudents"
import { useState } from "react"

const CreateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature, conclusion, setConclusion }) => {


  // ERROR HANDLING
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  
  const [disable, setDisable] = useState(false)

  const { students, setStudents } = useStudent()
  const {mutate: createQuarterGradeMutation} = useMutation({
    mutationFn: data => createQuarterGrade(data),
    onSuccess: res => {
      setDisable(true)
      setSuccess(true)
      setError(false)
      const studentFound = students.find(student => student.id == studentId)
      studentFound.averages = studentFound.averages.length > 0 ? [...studentFound.averages, res.data] : [res.data]
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
      create={createQuarterGradeMutation}
      success={success}
      setSuccess={setSuccess}
      error={error}
      setError={setError}
      disable={disable}
      setDisable={setDisable}
      conclusion={conclusion}
      setConclusion={setConclusion}
  />
  )
}

export default CreateAverage