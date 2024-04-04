import { Text, ScrollView} from "react-native"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import TutorAttendance from "./TutorAttendance"

const TutorAttendances = ({ route }) => {

    const attendances =  route?.params?.student?.atendances

  return (
    <NonScrollableContainer>
        <List 
            data={attendances}
            DetailComponent={TutorAttendance}
        />
    </NonScrollableContainer>
  )
}

export default TutorAttendances