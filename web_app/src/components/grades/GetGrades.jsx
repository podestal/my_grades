import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getGrades } from "../../api/api"
import Grade from "./Grade"
import { TextInput, Button } from "@tremor/react"
import ActivityCard from "../activities/ActivityCard"
import { useState } from "react"
import CreateActivity from "../activities/CreateActivity"
import useAssignatures from "../../hooks/useAssignatures"
import { RiSearchLine } from '@remixicon/react';
import Loading from "../../utils/Loading"
import UpdateActivity from "../activities/UpdateActivity"


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

    if (isLoading) return <Loading />

    if (isError) return <p>{error.message}</p>

  return (
    <>
        <div>
            <div className="mt-14 flex gap-8 justify-start items-center">
                <p className="text-lg font-poppins">Buscar Estudiante</p>
                <TextInput icon={RiSearchLine} value={filter} onValueChange={value => setFilter(value)} className="w-[220px]" placeholder="Buscar ..."/>
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
