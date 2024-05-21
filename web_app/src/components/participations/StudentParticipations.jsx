import useStudent from "../../hooks/useStudents"
import StudentParticipationsModal from "./StudentParticipationsModal"

const StudentParticipations = ({studentId, open, setOpen, setIsParticipation}) => {

    const {students} = useStudent()
    const student = students.find( student => student.id == studentId)

  return (
    <StudentParticipationsModal 
        student={student}
        open={open}
        setOpen={setOpen}
        setIsParticipation={setIsParticipation}
    />
  )
}

export default StudentParticipations