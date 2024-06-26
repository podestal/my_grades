import { Text } from "react-native"
import AttendanceForm from "./AttendanceForm"

const Late = ({ route }) => {

    const student = route?.params?.student

  return (
    <AttendanceForm 
        student={student}
        late={true}
        title={'Crear Tardanza'}
    />
  )
}

export default Late