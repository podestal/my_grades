import { useQuery } from "@tanstack/react-query"
import { getTutor, getAssignaturesByClase } from "../../api/api"
import Loading from "../utils/Loading"
import Error from "../utils/Error"
import useAuth from "../../hooks/useAuth"


export const getTutorQuery = (token) => {
    return useQuery({
        queryKey: ['tutor'],
        queryFn: () => getTutor({ token }),
    })
}
// const claseId = route?.params?.student?.clase?.id
export const getAssignaturesByClaseQuery = (token, claseId) => {
    return useQuery({
        queryKey: ['assignatures'],
        queryFn: () => getAssignaturesByClase({ token, claseId })
    })
}

const GetTutorData = () => {

    const { user } = useAuth()
    const { data: tutor, isLoading: isTutorLoading, isError: isTutorError } = getTutorQuery( user.access )
    const claseId = tutor && tutor?.data?.student?.clase?.id
    const { data: assignatures, isLoading: isAssignatureLoading, isError: isAssignatureError } = getAssignaturesByClaseQuery(user.access, claseId)


    

    if (isAssignatureLoading) return <Loading />

    if (isAssignatureError) return <Error />

  return (
    <>
        {console.log('claseId', claseId)}
    </>
  )
}

export default GetTutorData