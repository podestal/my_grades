import { useQueries } from '@tanstack/react-query'
import { getAssignatures } from '../../api/api'
import { getCategories } from '../../api/api'

const GetData = ({ user }) => {

    const data = useQueries({
        queries: [
            { queryKey: ['assignatures'], queryFn: () => getAssignatures({ token: user.access }), isSuccess: () => console.log('Success')},
            { queryKey: ['categories'], queryFn: () => getCategories({ token: user.access }), isSuccess: () => console.log('Success')},
        ],
    })

    // const { data: activities, isLoading, isError, error } = useQuery({
    //     queryKey: ['activities'],
    //     queryFn: () => getActivities({ token: user.access, assignature: assignatureId })
    // })

    return (
        <>
            {console.log('data', data)}
        </>
    )

}

export default GetData