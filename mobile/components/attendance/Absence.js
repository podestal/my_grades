import AttendanceForm from "./AttendanceForm"

const Absence = ({ route }) => {

    const student = route?.params?.student
  return (
    <>
        <AttendanceForm 
            student={student}
            late={false}
            title={'Crear Ausencia'}
        />
    </>
  )
}

export default Absence
