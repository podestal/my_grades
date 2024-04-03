import { Text, StyleSheet, View, Pressable } from "react-native"
import GradeDetail from "./GradeDetail"
import { useState } from "react"

const Capacity = ({ data, extraData }) => {

    const student = extraData?.student
    const assignature = extraData?.assignature
    const [show, setShow] = useState(false)

  return (
    <View>
        <Pressable onPress={() => setShow(!show)}>
            <Text style={styles.text}>{data.title}</Text>
            <Text>Promedio: AD</Text>
        </Pressable>
        {show && <GradeDetail 
            studentId={student.id}
            assignatureId={assignature.id}
            capcityId={data.id}
        />}
    </View>
  )
}

export default Capacity

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        // marginVertical: 14,
        // borderBottomWidth: 10,
        padding: 12,
    }
})