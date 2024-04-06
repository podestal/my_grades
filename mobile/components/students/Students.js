import { Text, View, StyleSheet, Pressable } from "react-native"
import { getStudents } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import List from "../utils/List"
import Student from "./Student"
import Input from "../utils/Input"
import { useState } from "react"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Students = ({ route }) => {

    const { user } = useAuth()
    const claseId = route?.params?.claseId
    const [name, setName] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access, claseId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <NonScrollableContainer>  
        <Input 
            label={'Buscar...'}
            value={name}
            setter={setName}
            placeholder={'Nombre o Apellido'}
        />
        <Pressable onPress={() => setShowDetails(!showDetails)}>
          <Text>{showDetails ? 'Ocultar Detalles' : 'Mostrar Detalles'}</Text>
        </Pressable>
        <NonScrollableContainer>
          <List 
              data={students.data
                ?.filter( student => (
                  `${student?.first_name} ${student?.last_name}`
                  .toLocaleLowerCase()
                  .includes(name.toLocaleLowerCase())
              )
            )}
              DetailComponent={Student}
              extraData={showDetails}
          />
        </NonScrollableContainer>
    </NonScrollableContainer>
  )
}

export default Students
