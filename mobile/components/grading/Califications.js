import { View, FlatList, Text, StyleSheet } from "react-native"
import Calification from "./Calification"
import List from "../utils/List"
import califications from "../../data/califications"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Califications = ({ grade, currentCalification, setCurrentCalification }) => {

  return (
    <>
        <FlatList 
            data={califications}
            keyExtractor={ item => item.id}
            renderItem={ itemData => (
                <Calification 
                    data={{calification: itemData.item, grade: grade, currentCalification, setCurrentCalification }} 
                />)}
            style={styles.listStyle}
        />
    </>
  )
}

export default Califications

const styles = StyleSheet.create({
    listStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})