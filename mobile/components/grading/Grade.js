import { Text, StyleSheet, Pressable, View } from "react-native"
import Title from "../utils/Title"
import Califications from "./Califications"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

const Grade = ({ data: grade }) => {

    const [currentCalification, setCurrentCalification] = useState(grade?.calification)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const navigator = useNavigation()
    const [show, setShow] = useState()

    const handlePress = () => {
        navigator.navigate('CreateObservation', {grade})
    }

    const handleShow = () => {
        setShow(true)
    }


  return (
    <>
        {console.log(grade)}
        <Title text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        {successMsg.length > 0 
        ? <Text style={{...styles.text, ...styles.textSuccess }}>{successMsg}</Text>
        : <Text style={{ ...styles.text, ...styles.textError}}>{errorMsg}</Text>
        }
        <Pressable onPress={handlePress} style={styles.observationsContainer}>
            <Text style={styles.observations}>{grade?.observations ? 'Mostar Observaciones' : 'Agregar Observaciones'}</Text>
        </Pressable>
        <View>
            <Text>{grade?.observations}</Text>
        </View>
        <Califications 
            grade={grade}
            currentCalification={currentCalification}
            setCurrentCalification={setCurrentCalification}
            setSuccessMsg={setSuccessMsg}
            setErrorMsg={setErrorMsg}
        />
    </>
  )
}

export default Grade

const styles = StyleSheet.create({
    text: {
        textAlign: 'center', 
    },
    textError: {
        color: '#c0392b'
    },
    textSuccess: {
        color: '#2ecc71'
    },
    observationsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 38,
        padding: 12,
    },
    observations: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4285F4'
    }

})