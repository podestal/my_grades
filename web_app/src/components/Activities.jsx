import React from 'react'
import useActivities from '../hooks/useActivities'
import { getActivities } from '../api/api'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

const Activities = (props) => {

    const { user } = useAuth()
    const location = useLocation()
    const assignature = location?.state?.assignature
    const { activities, setActivities } = useActivities()
    const { mutate: getActivitiesMutation } = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => setActivities(res.data),
        onError: err => console.log(err)
    })

    const getter = () => {
        getActivitiesMutation({token: user.access, assignature:assignature?.id})
    }

    useEffect(() => {
        getter()
    }, [])

  return (
    <>
        {console.log('Activities', activities)}
        <div>Activities</div>
    </>
  )
}

export default Activities