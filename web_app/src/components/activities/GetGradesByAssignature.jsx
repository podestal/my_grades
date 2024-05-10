import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getGradesByAssignature } from "../../api/api"
import Loading from "../../utils/Loading"
import GetActivities from "../getters/GetActivities"
import useGrades from "../../hooks/useGrades"
import useActivities from "../../hooks/useActivities"
import { useEffect } from "react"
import Activities from "./Activities"

const GetGradesByAssignature = ({ assignature, quarter }) => {

    const { user } = useAuth()
    const { setGrades } = useGrades()
    const { activities, setActivities } = useActivities()
    const { data: gradesByAssignature, isLoading } = useQuery({
        queryKey: ['gradesByAssignature'],
        queryFn: () => getGradesByAssignature({ token: user.access, assignatureId:assignature })
    })

    useEffect(() => {
        if (gradesByAssignature) {
            setGrades(gradesByAssignature.data)
        }
    }, [gradesByAssignature])

    if (isLoading) return <Loading />

  return (
    // <GetActivities 
    //     gradesByAssignature={gradesByAssignature.data}
    //     assignature={assignature}
    //     quarter={quarter}
    // />
    <>
    {activities.length == 0 
    ? 
    <GetActivities 
        assignature={assignature}
        setActivities={setActivities}
    />
    : 
    <Activities 
        assignature={assignature}
        quarter={quarter}
    />
    }
    </>
  )
}

export default GetGradesByAssignature