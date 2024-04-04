import { Text, View } from "react-native"

const TutorActivity = ({ data: grade }) => {
  return (
    <View>
        {console.log(grade)}
        <Text>{grade?.activity?.title}</Text>
        <Text>Calificación: {grade?.calification}</Text>
    </View>
  )
}

export default TutorActivity