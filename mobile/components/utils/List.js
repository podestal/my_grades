import { StyleSheet, FlatList, View } from "react-native"
import Input from "./Input"

const List = ({ data, DetailComponent, style }) => {
  return (
    <View style={styles.container}>
        {data && <FlatList 
            data={data}
            keyExtractor={ item => item.id}
            renderItem={ itemData => <DetailComponent data={itemData.item} />}
            style={style}
        />}
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20, 
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})