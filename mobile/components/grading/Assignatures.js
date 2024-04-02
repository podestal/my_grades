import { Text } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import { useQuery, useMutation } from "@tanstack/react-query"
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
    // const { data, isLoading, isError, error, isSuccess } = useQuery({
    //     queryKey: ['assignatures'],
    //     queryFn: () => getAssignatures({ token: user.access })
    // })

    // if (isLoading) return <Loading />

    // if (isError) return <Text>{error.message}</Text>

    const {mutate: getAssignaturesMutation, isPending, isError} = useMutation({
        mutationFn: (data) => getAssignatures(data),
        onSuccess: res => setAssignatures(res.data)
    })

    const getter = () => {
        getAssignaturesMutation({ token: user.access })
    }

    useEffect(() => {
        getter()
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

// data={activities.data}
// DetailComponent={Assignment}

export default Assignatures