import React from 'react'
import { getActivities } from '../api/api'
import useActivities from '../hooks/useActivities'
import useAuth from '../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import Activity from './Activity'

const Activities = ({ assignature, grades, competence, name }) => {

    

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
    <div className='activities-container'>
        {competence.area != 99
        ?
        <>
        {activities && activities
            .filter( activity => activity.competence == competence?.id)
            .map( activity => (
                <div className='activities-item'>
                    <h2>{activity?.title}</h2>
                    <div>
                        {!name.lenth > 0 
                        ? 
                        <>
                            {grades && grades
                                .filter( grade => grade?.activity?.id == activity.id)
                                .filter( grade => `${grade?.student?.first_name} ${grade?.student?.last_name}`.toLowerCase().includes(name.toLowerCase()))
                                .map( grade => <p className='grade-item' key={grade.id}>{grade.calification}</p>)
                            }
                        </>
                        :
                        <>
                        {grades && grades
                            .filter( grade => grade?.activity?.id == activity.id)
                            .map( grade => <p className='grade-item' key={grade.id}>{grade.calification}</p>)
                        }
                        </>
                        }
                    </div>
                </div>
        ))}
    </> 
        :
        <>
        {activities && activities
            .map( activity => (
                <div className='activities-item'>
                    <h2>{activity?.title}</h2>
                    <div>
                        {grades && grades
                            .filter( grade => grade?.activity?.id == activity.id)
                            .map( grade => <p className='grade-item' key={grade.id}>{grade.calification}</p>)
                        }
                    </div>
                </div>
        ))}
    </>
        }
    </div>
  )
}

export default Activities