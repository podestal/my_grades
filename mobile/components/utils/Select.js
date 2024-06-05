import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";

const Select = ({ setter, title, data, label, hideSelected }) => {

    const [focus, setFocus] = useState(false)

  return (
    <View style={{width: '100%', alignItems: 'center' }}>
        <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 18,}}>{title}</Text>
        <ScrollView 
            // style={styles.dropdownContainer}
            style={{width: '100%', }}
            contentContainerStyle={{alignItems: 'center' }}
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
                onChange={item => setter(item)}
                selectedTextStyle={{fontSize:20, display: hideSelected}}
                placeholderStyle={{fontSize:20}}
                // containerStyle={{padding: 40}}
                style={{paddingHorizontal: 20, width: '70%',}}
            />
        </ScrollView>
    </View>
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