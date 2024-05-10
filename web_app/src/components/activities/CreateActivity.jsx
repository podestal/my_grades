import { Button } from "@tremor/react"
import { useState } from "react"
import { createActivity, updateActivity } from "../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useCategories from "../../hooks/useCategories"
import GetCategories from "../getters/GetCategories"
import useActivities from "../../hooks/useActivities"
import ActivityForm from "./ActivityForm"

const CreateActivity = ({ assignature, activity }) => {

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const { activities, setActivities } = useActivities()

    // Cats
    const { categories, setCategories } = useCategories()
    

    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // Mutation Create
    const { mutate: createActivityMutation } = useMutation({
        mutationFn: data => createActivity(data),
        onSuccess: res => {
            setSuccess('Su actividad fué creada con éxito')
            setError('')
            queryClient.invalidateQueries(['activities'])
            activities.length > 0
            ?setActivities( activities => [...activities, res.data])
            :setActivities([res.data])
        },
        onError: err => {
            setError('No se pudo crear actividad, inténtelo otra vez')
            setSuccess('')
        }
    })

    // Mutation Update
    const { mutate: updateActivityMutation } = useMutation({
        mutationFn: data => updateActivity(data),
        onSuccess: res => {
            console.log('Activity update response',res.data)
            queryClient.invalidateQueries(['activities'])
            setSuccess('Actividad editada')
            setError('')
        },
        onError: err => {
            setError('No se pudo editar actividad, inténtelo otra vez')
            setSuccess('')
        }
    })

    const handleCreate = () => {
        // const formattedDate = moment(date).format('YYYY-MM-DD')
        // if (activity) {
        //     updateActivityMutation({
        //         token: user.access,
        //         activityId: activity.id,
        //         updates: {
        //             title,
        //             description,
        //             assignature: assignature.id,
        //             quarter: selectedQuarter,
        //             due_date: formattedDate,
        //             competence: selectedCompetency,
        //             capacity: selectedCapacity,
        //             category: selectedCategory,
        //         }
        //     })
        // } 
    }

  return (
    <div>
        {categories.length == 0 
        ?
        <GetCategories 
            setCategories={setCategories}
        />
        :
        <>
        <div className='flex items-start justify-center'>
            <Button onClick={() => setOpen(true)} color='violet-950' className="hover:bg-violet-900">Crear Actividad</Button>
            <ActivityForm 
                activity={activity}
                assignature={assignature}
                open={open}
                setOpen={setOpen}
                success={success}
                setSuccess={setSuccess}
                error={error}
                setError={setError}
                create={createActivityMutation}
            />
        </div>
        </>
        }
    </div>
  )
}

export default CreateActivity