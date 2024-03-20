import { StyleSheet, FlatList } from "react-native"

const List = ({ data, DetailComponent }) => {
  return (
    <>
        {data && <FlatList 
            data={data}
            keyExtractor={ item => item.id}
            style={styles.container}
            contentContainerStyle={styles}
            renderItem={ itemData => <DetailComponent data={itemData.item} />}
        />}
    </>
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