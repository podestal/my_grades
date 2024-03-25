import { Text } from "react-native"
import { getStudents } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import List from "../utils/List"
import Student from "./Student"

const Students = ({ route }) => {

    const { user } = useAuth()
    const claseId = route?.params?.claseId
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access, claseId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>  
        <List 
            data={students.data}
            DetailComponent={Student}
        />
    </>
  )
}

export default Students