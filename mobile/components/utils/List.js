import { StyleSheet, FlatList, View } from "react-native"

const List = ({ data, DetailComponent, style, extraData, refresh, setRefresh, onRefresh }) => {

    const handleRefresh = () => {

        setRefresh && setRefresh(true)
        onRefresh&& onRefresh()
        setRefresh && setRefresh(false)
    }

  return (
    <View style={styles.container}>
        {data && <FlatList 
            refreshing={refresh == undefined ? false : refresh}
            onRefresh={handleRefresh}
                
            data={data}
            keyExtractor={ item => item.id}
            renderItem={ itemData => <DetailComponent data={itemData.item} extraData={extraData} />}
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