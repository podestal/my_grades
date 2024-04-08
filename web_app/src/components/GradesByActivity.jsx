import React from 'react'
import { useLocation } from 'react-router-dom'
import { getGrades } from '../api/api'
import useAuth from '../hooks/useAuth'
import useGrades from '../hooks/useGrades'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

const GradesByActivity = () => {
    const location = useLocation()
    const activity = location?.state?.activity
    const { user } = useAuth()
    const { grades, setGrades } = useGrades()
    const [ filteredGrades, setFilteredGrades ] = useState(grades && grades.filter( grade => grade?.activity?.id == activity.id) || [])

    const {mutate: getGradesMutation, isPending, isError } = useMutation({
        mutationFn: data => getGrades(data),
        onSuccess: res => {
            setGrades( prev => ([ ...prev, ...res.data])),
            setFilteredGrades( res.data )
        },
        onErro: err => console.log(err.data)
    })

    const getter = () => {
        getGradesMutation({ token: user.access, activityId: activity.id })
    }

    useEffect(() => {
        if (filteredGrades.length == 0) {
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div>
        {console.log('filteredGrades',grades)}
    </div>
  )
}

export default GradesByActivity