import AttendanceForm from "./AttendanceForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeAttendance } from "../../api/api"
import useAuth from "../../hooks/useAuth"

const RemoveAbsence = ({ route }) => {

    const student = route?.params?.student
    const attendanceId = route?.params?.todayAttendence[0]?.id
    const status = route?.params?.todayAttendence[0]?.status
    const isLate = status == 'L'
    const hour = route?.params?.todayAttendence[0]?.hour
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const {mutate: removeAttendanceMutation} = useMutation({
        mutationFn: data => removeAttendance(data),
        onSuccess: res => queryClient.invalidateQueries(['studentsBySchool']),
        onError: err => console.log(err)
    })

    const handleDeleteAttendence = () => {
        removeAttendanceMutation({
            token: user.access,
            attendanceId
        })
    }



  return (
    <>  
        <AttendanceForm 
            student={student}
            late={isLate}
            title={isLate ? 'Eliminar Tardanza' : 'Eliminar Ausencia'}
            lateHour={hour ? hour : ''}
            handler={handleDeleteAttendence}
            remove={true}
        />
    </>
  )
}

export default RemoveAbsence