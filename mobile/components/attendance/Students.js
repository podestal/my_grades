import { Text, View } from "react-native"
import Select from "../utils/Select"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getStudentsBySchool } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import Student from "./Student"
import Input from "../utils/Input"
import NonScrollableContainer from "../utils/NonScrollableContainer"

const Students = ({ clases, schoolId }) => {

    const [clase, setClase] = useState('')
    const [name, setName] = useState('')
    const { user } = useAuth()
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['studentsBySchool'],
        queryFn: () => getStudentsBySchool({ token: user.access, schoolId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <NonScrollableContainer>
        <View>
            <Select 
                title={'Clase'}
                setter={setClase}
                data={clases}
            />
            <Input
                label={'Buscar estudiante ...'}
                value={name}
                setter={setName}
                placeholder={'Nombre o Apellido'}
            />
        </View>
        <View style={{flex: 1}}>
            <List 
                data={students.data
                        .filter(student => student.clase == clase)
                        .filter(student => (
                            student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) || 
                            student?.last_name.toLowerCase().includes(name.toLocaleLowerCase())
                        ))
                    }
                DetailComponent={Student}
            />
        </View>
    </NonScrollableContainer>
  )
}

export default Students