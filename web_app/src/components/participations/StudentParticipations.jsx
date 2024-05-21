import useStudent from "../../hooks/useStudents"
import StudentParticipationsModal from "./StudentParticipationsModal"

const StudentParticipations = ({studentId, open, setOpen, setIsParticipation, quarter, selectedCompetency, selectedCapacity, assignature}) => {

    const {students} = useStudent()
    const student = students.find( student => student.id == studentId)

  return (
    <StudentParticipationsModal 
        student={student}
        open={open}
        setOpen={setOpen}
        setIsParticipation={setIsParticipation}
        quarter={quarter}
        selectedCompetency={selectedCompetency}
        selectedCapacity={selectedCapacity}
        assignature={assignature}
    />
  )
}

export default StudentParticipations