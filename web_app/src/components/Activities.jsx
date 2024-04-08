import React from 'react'
import useActivities from '../hooks/useActivities'
import { getActivities } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import Activity from './Activity'
import { useState } from 'react'

const Activities = (props) => {

    const { user } = useAuth()
    const location = useLocation()
    const assignature = location?.state?.assignature
    const { activities, setActivities } = useActivities()
    const [filteredActivities, setFilteredActivities] = useState(activities.length > 0 && activities.filter( activity => activity.assignature == assignature.id) || [])
    const { mutate: getActivitiesMutation, isPending, isError } = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => {
            setActivities(prev => ([ ...prev, ...res.data ]))
            setFilteredActivities(res.data)
        },
        onError: err => console.log(err)
    })

    const getter = () => {
        getActivitiesMutation({token: user.access, assignature:assignature?.id})
    }

    useEffect(() => {
        console.log('filteredActivities',filteredActivities)
        if (filteredActivities.length == 0) {
            console.log('getting activities')
            getter()
        }
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error />

  return (
    <>
        {filteredActivities.map( activity => (
            <Activity 
                key={activity.id}
                activity={activity}
            />
        
        ))}
    </>
  )
}

export default Activities