import Title from "../utils/Title"
import { Text, View, StyleSheet } from "react-native"
import Calification from "../utils/Calification"

const Grade = ({ data: grade }) => {

    const califications = ['NA', 'C', 'B', 'A', 'AD']

  return (
    <>
        <Title  text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <View style={styles.gradesContainer}>
            {califications.map( nota => (
                <Calification 
                    key={nota}
                    calification={nota}
                    currentCalification={grade.calification == nota ? grade.calification : 'default'}
                />
            ))}
        </View>

    </>
  )
}

export default Grade

const styles = StyleSheet.create({
    gradesContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})