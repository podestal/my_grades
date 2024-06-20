import { View } from "react-native"
import Select from "../utils/Select"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getStudentsBySchool } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import List from "../utils/List"
import Student from "./Student"
import Input from "../utils/Input"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import useStudents from "../../hooks/useStudents"
import Loading from "../utils/Loading"
import Error from "../utils/Error"

const Students = ({ clases, schoolId }) => {

    const [clase, setClase] = useState('')
    const [name, setName] = useState('')
    // const { students, setStudents } = useStudents()
    const { user } = useAuth()

    // const {mutate: getStudentsBySchoolMutation, isPending, isError} = useMutation({
    //     mutationFn: data => getStudentsBySchool(data),
    //     onSuccess: res => {
    //         setStudents(res.data)
    //     },
    //     onError: err => console.log(err)
    // })

    // const getter = () => {
    //     getStudentsBySchoolMutation({ token: user.access, schoolId })
    // }

    // useEffect(() => {
    //     if (students.length == 0) {
    //         getter()
    //     }
    // }, [])

    const { data: students, isLoading, isError } = useQuery({
        queryKey: ['students'],
        queryFn: () => getStudentsBySchool({ token: user.access, schoolId })
    })

    if (isLoading) return <Loading />

    if (isError) return <Error />

    // const {data, isLoading, isError, error ,refetch} = useQuery({
    //     queryKey: ['studentsAttendance'],
    //     queryFn: () => getStudentsBySchool({ token: user.access, schoolId })
    // })

    // if (isLoading) return <Loading />

    // if (isError) return <Error retry={refetch}/>

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
        {/* {console.log(students.data)}
        {console.log('clase',clase)} */}
        <View style={{flex: 1}}>
            <List 
                data={students.data
                        ?.filter(student => student.clase == clase.id)
                        ?.filter( student => (
                            `${student?.first_name} ${student?.last_name}`
                            .toLocaleLowerCase()
                            .includes(name.toLocaleLowerCase())
                        ))
                    }
                DetailComponent={Student}
                // refresh={refresh}
                // setRefresh={setRefresh}
                // onRefresh={getter}
            />
        </View>
    </NonScrollableContainer>
  )
}

export default Students