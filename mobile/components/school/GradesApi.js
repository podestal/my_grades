import { useQuery } from "@tanstack/react-query"
import { getGrades } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { Text } from "react-native"
import Input from "../utils/Input"
import List from "../utils/List"
import Grade from "./Grade"


const GradesApi = ({ activityId, name, setName }) => {

    const { user } = useAuth()

    const {data: grades, isLoading, isError, error} = useQuery({
        queryKey: ['grades'],
        queryFn: () =>  getGrades({ token: user.access, activityId })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        <Input
            label={'Buscar...'}
            value={name}
            setter={setName}
            placeholder={'Nombre o Apellido'}
        />
        <List 
            data={grades.data.filter( grade => (
                grade?.student?.first_name.toLowerCase().includes(name.toLocaleLowerCase()) ||  
                grade?.student?.last_name.toLowerCase().includes(name.toLocaleLowerCase()))
            )}
            style={{marginBottom: 250}}
            DetailComponent={Grade}
        /> 
    </>
  )
}

export default GradesApi
