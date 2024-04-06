import { ScrollView, StyleSheet, Text } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";

const Select = ({ setter, title, data, label }) => {

    const [focus, setFocus] = useState(false)

  return (
    <>
        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 12}}>{title}</Text>
        <ScrollView 
            // style={styles.dropdownContainer}
        >
            <Dropdown 
                data={data}
                search
                labelField={label ? label : 'title'}
                valueField='id'
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                searchPlaceholder={title ? `Busca ${title}` : 'Buscar'}
                placeholder={title ? `Selecciona ${title}` : 'Seleccionar'}
                onChange={item => setter(item.id)}
                selectedTextStyle={{fontSize:40, display: 'none'}}
                placeholderStyle={{fontSize:20}}
                // containerStyle={{padding: 40}}
                style={{padding: 40}}
            />
        </ScrollView>
    </>
  )
}

export default Select

const styles = StyleSheet.create({
    dropdownContainer: {
        height: 10,
    },
    dropdownContentContainer: {
        alignItems: 'center',
    }
})