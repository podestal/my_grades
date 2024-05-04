import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getGrades } from "../../api/api"
import Grade from "./Grade"
import { TextInput, Button } from "@tremor/react"
import ActivityCard from "../activities/ActivityCard"
import { useState } from "react"
import CreateActivity from "../dashboard/dashboardComponents/CreateActivity"
import useAssignatures from "../../hooks/useAssignatures"

const GetGrades = ({ activity }) => {

    const { user } = useAuth()
    const { assignatures } = useAssignatures()    
    const assignature = assignatures.find( assignature => assignature.id == activity.assignature)
    const [filter, setFilter] = useState('')
    const [open, setOpen] = useState(false)
    const { data: grades, isLoading, isError, error } = useQuery({
        queryKey: ['grades'],
        queryFn: () => getGrades({ token: user.access, activityId: activity.id })
    })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>{error.message}</p>

  return (
    <>
        <div className="max-w-[1450px] mx-auto">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-5xl font-poppins ">{activity.title}</h2>
                <p>{activity.description}</p>
                <CreateActivity 
                    assignature={assignature}
                    activity={activity}
                />
            </div>
            <div className="my-10 flex gap-8 justify-start items-center">
                {/* Filter by name */}
                <p className="text-lg font-poppins">Buscar Estudiante</p>
                <TextInput value={filter} onValueChange={value => setFilter(value)} className="w-[220px]" placeholder="Buscar ..."/>
            </div>
            {grades.data
                .filter( grade => (
                    `${grade?.student?.first_name} ${grade?.student?.last_name}`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ))
                .map( grade => (
                <Grade 
                    key={grade.id}
                    grade={grade}
                />
            ))}
        </div>
    </>
  )
}

export default GetGrades
