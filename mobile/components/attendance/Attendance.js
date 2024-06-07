import { Text } from "react-native"
import useAuth from "../../hooks/useAuth"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getClases } from "../../api/api"
import Students from "./Students"
import useClases from "../../hooks/useClases"
import { useEffect } from "react"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAssignatures from "../../hooks/useAssignatures"

const Attendance = () => {

    const { user } = useAuth()
    const { clases, setClases } = useClases()

    const {assignatures} = useAssignatures()
    const filteredClases = assignatures.map( assignature => assignature.clase)

    const queryClient = useQueryClient()

    const {mutate: getClasesMutation, isPending, isError} = useMutation({
        mutationFn: data => getClases(data),
        onSuccess: res => {
            console.log(res.data)
            setClases(res.data)
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getClasesMutation({ token: user.access, schoolId: user.school })
    }

    useEffect(() => {
        if (user.profile == 'I' && clases.length == 0) {
            setClases(filteredClases)
        }
        else if (user.profile == 'A' && clases.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error retry={getter}/>

  return (
    <>
        <Students 
            clases={clases}
            schoolId={user.school}
        />
    </>
  )
}

export default Attendance