import useStudent from "../../hooks/useStudents"

const StudentParticipations = ({studentId}) => {

    const {students} = useStudent()
    const student = students.find( student => student.id == studentId)

  return (
    <div>
        {console.log('student from studentparticipation:',student.participations)}
    </div>
  )
}

export default StudentParticipations