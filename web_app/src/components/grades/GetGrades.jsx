import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getGrades } from "../../api/api"


const GetGrades = ({ activity }) => {

    const { user } = useAuth()
    const { data: grades, isLoading, isError, error } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId: activity.id })
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div>
        <h2>{activity.title}</h2>
        {console.log('grades', grades.data)}
    </div>
  )
}

export default GetGrades