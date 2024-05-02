import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getGrades } from "../../api/api"
import Grade from "./Grade"


const GetGrades = ({ activity }) => {

    const { user } = useAuth()
    const { data: grades, isLoading, isError, error } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId: activity.id })
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

  return (
    <div className="max-w-[1450px] mx-auto">
        <h2 className="text-5xl font-poppins ">{activity.title}</h2>
        {console.log('grades', grades.data[0].student)}
        {grades.data.map( grade => (
            <Grade 
                key={grade.id}
                grade={grade}
            />
        ))}
    </div>
  )
}

export default GetGrades
