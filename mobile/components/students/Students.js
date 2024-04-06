import { Text, Pressable } from "react-native"
import { getStudents } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import List from "../utils/List"
import Student from "./Student"
import Input from "../utils/Input"
import { useState, useEffect } from "react"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import useStudents from "../../hooks/useStudents"
import Loading from "../utils/Loading"
import Error from "../utils/Error"

const Students = ({ route }) => {

    const { user } = useAuth()
    const claseId = route?.params?.claseId
    const [name, setName] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const { students, setStudents } = useStudents()
    const filteredStudents = students?.filter( student => student.clase = claseId) || []
    const { mutate: getStudentsMutation, isPending, isError } = useMutation({
        mutationFn: data => getStudents(data),
        onSuccess: res => setStudents( prev => ([ ...prev, ...res.data ])),
        onError: err => console.log(err)
    })

    const getter = () => {
        getStudentsMutation({ token: user.access, claseId })
    }

    useEffect(() => {
        if (filteredStudents.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

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
              data={students
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
