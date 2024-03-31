import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getClases } from "../../api/api"
import Students from "./Students"

const Attendance = () => {

    const { user } = useAuth()
    const {data: clases, isLoading, isError, error} = useQuery({
        queryKey: ['clases'],
        queryFn: () => getClases({ token: user.access, schoolId: user.school })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        {console.log('clases', clases.data)}
        <Students 
            clases={clases.data}
            schoolId={user.school}
        />
    </>
  )
}

export default Attendance