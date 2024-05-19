import AveragesForm from "./AveragesForm"
import { updateQuarterGrade } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useStudent from "../../hooks/useStudents"

const UpdateAverage = ({ open, setOpen, student, studentId, calification, setCalification, selectedCompetency, quarter, assignature, averageId }) => {

    const { students, setStudents } = useStudent()
    const { mutate: updateQuarterGradeMutation } = useMutation({
        mutationFn: data => updateQuarterGrade(data),
        onSuccess: res => {
            console.log(res.data)
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
        update={updateQuarterGradeMutation}
        averageId={averageId}
    />
  )
}

export default UpdateAverage