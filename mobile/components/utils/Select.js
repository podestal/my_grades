import { ScrollView, StyleSheet, Text } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";

const Select = ({ setter, title, data }) => {

    const [focus, setFocus] = useState(false)

  return (
    <>
        <Text style={{fontSize: 16, textAlign: 'center'}}>{title}</Text>
        <ScrollView 
            style={styles.dropdownContainer}
        >
            <Dropdown 
                data={data}
                search
                labelField='title'
                valueField="id"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                searchPlaceholder={`Busca ${title}`}
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
        height:20,
    },
    dropdownContentContainer: {
        alignItems: 'center',
        width: 300,
    }
})