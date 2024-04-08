import React from 'react'
import { getActivities } from '../api/api'
import useActivities from '../hooks/useActivities'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

const Activities = ({ competence, assignature }) => {

    const { user } = useAuth()
    const { activities, setActivities } = useActivities()
    const { mutate: getActivitiesMutation, isPending, isError } = useMutation({
        mutationFn: data => getActivities(data),
        onSuccess: res => setActivities(res.data),
        onError: err => console.log(err)
    })

    const getter = () => {
        getActivitiesMutation({ token: user.access, assignature:assignature.id })
    }

    useEffect(() => {
        getter()
    }, [])

    if (isPending) return <Loading />

    if (isError) return <Error refetch={getter}/>

  return (
    <div>
        <h1>Activities</h1>
        {console.log('activities',activities)}
        {console.log('competence', competence)}
        {activities
            .filter( activity => activity.competence == competence.id)
            .map( activity => <p key={activity.id}>{activity.title}</p>)
        }
    </div>
  )
}

export default Activities