import { Text, StyleSheet } from "react-native"
import GradeDetail from "./GradeDetail"

const Capacity = ({ data, extraData }) => {

    const student = extraData?.student
    const assignature = extraData?.assignature

  return (
    <>
        <Text style={styles.text}>{data.title}</Text>
        {console.log(data.id)}
        <GradeDetail 
            studentId={student.id}
            assignatureId={assignature.id}
            capcityId={data.id}
        />
    </>
  )
}

export default Capacity

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        marginVertical: 14,
        borderBottomWidth: 10,
        padding: 12,
    }
})