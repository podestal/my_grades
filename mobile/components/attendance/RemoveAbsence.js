import AttendanceForm from "./AttendanceForm"

const RemoveAbsence = ({ route }) => {

    const student = route?.params?.student
    const attendanceId = route?.params?.todayAttendence[0]?.id
    const status = route?.params?.todayAttendence[0]?.status
    const isLate = status == 'L'
    const hour = route?.params?.todayAttendence[0]?.hour

  return (
    <>  
        <AttendanceForm 
        student={student}
        late={isLate}
        title={isLate ? 'Eliminar Tardanza' : 'Eliminar Ausencia'}
        lateHour={hour ? hour : ''}
    />
    </>
  )
}

export default RemoveAbsence