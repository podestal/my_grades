import { Text } from "react-native"
import useStudents from "../../hooks/useStudents"
import { getStudents } from "../../api/api"
import { useMutation } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { useEffect } from "react"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import List from "../utils/List"
import Student from "./Student"
import NonScrollableContainer from "../utils/NonScrollableContainer"

// getStudents({ token: user.access, claseId })

const Participations = ({ route }) => {

    const claseId = route?.params?.assignature?.clase?.id
    const { user } = useAuth()
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
        <List 
            data={students?.filter( student => student.clase = claseId)}
            DetailComponent={Student}
        />
    </NonScrollableContainer>
  )
}

export default Participations