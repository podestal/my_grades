import { ScrollView, StyleSheet, Text } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Select = ({ setter, title, apiGetter, filter, keyWord }) => {

    const [focus, setFocus] = useState(false)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [`${keyWord}`],
        queryFn: () => apiGetter({ filter })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <Text style={{fontSize: 16, textAlign: 'center'}}>{title}</Text>
        {console.log(data.data)}
        <ScrollView 
            style={styles.dropdownContainer}
        >
            <Dropdown 
                data={data && data.data}
                search
                labelField="title"
                valueField="id"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                searchPlaceholder={`Selecciona ${title}`}
                placeholder={`Selecciona ${title}`}
                onChange={item => setter(item.id)}
                selectedTextStyle={{fontSize:20}}
                placeholderStyle={{fontSize:20}}
                containerStyle={{padding: 40}}
                style={{padding: 40}}
            />
        </ScrollView>
    </>
  )
}

export default Select

const styles = StyleSheet.create({
    dropdownContainer: {
        height:250,
    },
    dropdownContentContainer: {
        alignItems: 'center',
        width: 300,
    }
})