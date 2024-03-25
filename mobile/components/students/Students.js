import { Text } from "react-native"
import { getStudents } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

const Students = ({ route }) => {

    const { user } = useAuth()
    const {data: students, isLoading, isError, error} = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudents({ token: user.access })
    })

    const claseId = route?.params?.claseId

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>  
        {console.log(students.data)}
        <Text>Clase Id: {claseId}</Text>
    </>
  )
}

export default Students