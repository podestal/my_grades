import { Text } from "react-native"
import useAssignatures from "../../hooks/useAssignatures"
import Clases from "../students/Clases"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { getClases } from "../../api/api"
import { useEffect, useState } from "react"

const Attendance = () => {

    const {assignatures} = useAssignatures()
    const { user } = useAuth()
    const schoolId = user?.school
    const {data: clases, isLoading, isError, error} = useQuery({
        queryKey: ['clases'],
        queryFn: () => getClases({ token: user.access, schoolId: user.school })
    })

    if (isLoading) return <Text>Loading ...</Text>

    if (isError) return <Text>{error.message}</Text>

  return (
    <>
        {console.log('clases', clases.data)}
        <Clases />
    </>
  )
}

export default Attendance