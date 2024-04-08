import { getAssignatures } from "../api/api"
import { useMutation } from "@tanstack/react-query"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAuth from "../hooks/useAuth"
import useAssignatures from "../hooks/useAssignatures"
import { useEffect } from "react"
import Assignature from "./Assignature"

const GetAssignatures = () => {
    const { user } = useAuth()
    const { assignatures, setAssignatures } = useAssignatures()
    const { mutate: getAssignaturesMutation, isPending, isError } = useMutation({
        mutationFn: data => getAssignatures(data),
        onSuccess: res => setAssignatures([ ...res.data ]),
        onError: err => console.log(err),
    })

    const getter = () => {
        getAssignaturesMutation({ token: user.access })
    }

    useEffect(() => {
        if (assignatures.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <>
        {assignatures && assignatures.map( assignature => <Assignature key={assignature.id} assignature={assignature}/>)}
    </>
  )
}

export default GetAssignatures