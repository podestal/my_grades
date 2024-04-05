import { Text, View, ScrollView } from "react-native"

const Student = ({ data: student }) => {
  return (
    <View>
        <ScrollView>
            <Text>{student.first_name} {student.last_name}</Text>
        </ScrollView>
        <Text>Participaciones: {student?.participations?.length}</Text>
    </View>
  )
}

export default Student