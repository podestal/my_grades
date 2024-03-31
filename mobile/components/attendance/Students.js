import { Text } from "react-native"
import Select from "../utils/Select"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getStudentsBySchool } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import Student from "./Student"

const Students = ({ clases, schoolId }) => {

    const [clase, setClase] = useState('')
    const { user } = useAuth()
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['studentsBySchool'],
        queryFn: () => getStudentsBySchool({ token: user.access, schoolId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        {console.log('Clase selected',clase)}
        <Select 
            title={'Clase'}
            setter={setClase}
            data={clases}
        />
        <List 
            // data, DetailComponent, style, extraData
            data={students.data
                    .filter(student => student.clase == clase)
                }
            DetailComponent={Student}
        />
    </>
  )
}

export default Students