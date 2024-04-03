import { Text, View } from "react-native"

const TutorActivity = ({ data: activity }) => {
  return (
    <View>
        <Text>{activity.title}</Text>
        <Text>Calificación: A</Text>
    </View>
  )
}

export default TutorActivity