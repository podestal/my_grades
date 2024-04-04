import { Text, StyleSheet, Pressable, View, Button } from "react-native"
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
        if (grade?.observations) {
            setShow(!show)
        } else {
            navigator.navigate('CreateObservation', {grade})
        }
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
            {grade?.observations
            ?
            <Text style={styles.observations}>{show ? 'Ocultar Observaciones' : 'Mostar Observaciones'}</Text>
            :
            <Text style={styles.observations}>Agregar Observaciones</Text>
            }
        </Pressable>
        {show && 
        <View style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, marginBottom: 20, marginTop: -45}}>
            <Text style={{fontSize: 16, marginVertical: 18}}>{grade?.observations}</Text>
            <Button title="Modificar Observaciones" onPress={() => navigator.navigate('CreateObservation', {grade})}/>
        </View>}
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