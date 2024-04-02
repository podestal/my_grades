import { Text, StyleSheet } from "react-native"
import Title from "../utils/Title"
import Califications from "./Califications"
import { useState } from "react"

const Grade = ({ data: grade }) => {

    const [currentCalification, setCurrentCalification] = useState(grade?.calification)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
  return (
    <>
        <Title text={`${grade?.student?.first_name} ${grade?.student?.last_name}`}/>
        <Text 
            style={ successMsg.length > 0 ? {...styles.text, ...styles.textSuccess } : { ...styles.text, ...styles.textError}}
            >{successMsg ? successMsg : errorMsg}
        </Text>
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
        marginBottom: 28,
    },
    textError: {
        color: '#c0392b'
    },
    textSuccess: {
        color: '#2ecc71'
    }
})