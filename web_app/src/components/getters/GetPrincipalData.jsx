import React from 'react'
import { getStudentsBySchool } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'

const getStudentsData = ( user ) => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => getStudentsBySchool({ token: user.access, schoolId: user.school }) 
    })
}

const GetPrincipalData = () => {
  return (
    <div>GetPrincipalData</div>
  )
}

export default GetPrincipalData