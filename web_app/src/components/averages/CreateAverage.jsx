import { createQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import AveragesForm from "./AveragesForm"
import useStudent from "../../hooks/useStudents"

const CreateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature }) => {

  const { students, setStudents } = useStudent()
  const {mutate: createQuarterGradeMutation} = useMutation({
    mutationFn: data => createQuarterGrade(data),
    onSuccess: res => {
      setCalification(res.data.calification)
      const studentFound = students.find(student => student.id == studentId)
      studentFound.averages = studentFound.averages.length > 0 ? [...studentFound.averages, res.data] : [res.data]
      setStudents( students => students.map( student => {
        if (student.id == studentId) {
          student = studentFound
        }
        return student
      }))},
    onError: err => console.log(err)
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
  />
  )
}

export default CreateAverage