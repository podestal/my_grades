import { ScrollView, StyleSheet, Text } from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import { getCompetencies } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const Select = ({ setCompetence, title }) => {

    const [focus, setFocus] = useState(false)
    const { user } = useAuth()

    const { data: competencies, isLoading, isError, error } = useQuery({
        queryKey: ['competencies'],
        queryFn: () => getCompetencies({ token: user.access })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <Text style={{fontSize: 16, textAlign: 'center'}}>{title}</Text>
        {console.log(competencies.data)}
        <ScrollView 
            style={styles.dropdownContainer}
        >
            <Dropdown 
                data={competencies && competencies.data}
                search
                labelField="title"
                valueField="id"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                searchPlaceholder={"Selecciona Competencia"}
                placeholder="Selecciona una competencia"
                onChange={item => setCompetence(item.id)}
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