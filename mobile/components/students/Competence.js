import { useState } from "react"
import { Text, Pressable, StyleSheet, View } from "react-native"
import List from "../utils/List"
import { getFilteredCapacities } from "../../data/capacities"
import Capacity from "./Capacity"


const Competence = ({ data }) => {

    const [show, setShow] = useState(false)
    const capacities = getFilteredCapacities(data.id)

  return (
    <Pressable onPress={() => setShow(!show)}>
        <Text style={styles.text}>{data.title}</Text>
        {show &&         
        <List 
            data={capacities}
            DetailComponent={Capacity}
        />}
    </Pressable>
  )
}

export default Competence

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 14,
        borderBottomWidth: 10,
        backgroundColor: '#ecf0f1',
        padding: 12,
    }
})