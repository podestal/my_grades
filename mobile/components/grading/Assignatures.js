import { Text } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import { useMutation } from "@tanstack/react-query"
import { getAssignatures } from "../../api/api"
import useAuth from "../../hooks/useAuth"
import Assignature from "./Assignature"
import List from "../utils/List"
import NonScrollableContainer from "../utils/NonScrollableContainer"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import { useEffect } from "react"

const Assignatures = () => {

    const {assignatures, setAssignatures} = useAssignatures()
    const { user } = useAuth()

    const {mutate: getAssignaturesMutation, isPending, isError} = useMutation({
        mutationFn: (data) => getAssignatures(data),
        onSuccess: res => setAssignatures(res.data)
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

    if (isError) return <Error retry={getter}/>

    return (
        <NonScrollableContainer>
            <List 
                data={assignatures}
                DetailComponent={Assignature}
            />
        </NonScrollableContainer>
    )
}

export default Assignatures