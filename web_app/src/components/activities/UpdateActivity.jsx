import useCategories from "../../hooks/useCategories"
import useActivities from "../../hooks/useActivities"
import { useState } from "react"
import { Button } from "@tremor/react"
import { updateActivity } from "../../api/api"
import GetCategories from "../getters/GetCategories"
import ActivityForm from "./ActivityForm"
import { useQueryClient, useMutation } from "@tanstack/react-query"

const UpdateActivity = ({ assignature, activity }) => {


    const queryClient = useQueryClient()

    // LOCAL STATE
    const { activities, setActivities } = useActivities()
    const { categories, setCategories } = useCategories()

    // PANEL HANDLER
    const [open, setOpen] = useState(false)
    
    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // Mutation Update
    const { mutate: updateActivityMutation } = useMutation({
        mutationFn: data => updateActivity(data),
        onSuccess: res => {
            console.log('Activity update response',res.data)
            // queryClient.invalidateQueries(['activities'])
            setActivities( preActivities => preActivities.map( prevActivity => {
                if (prevActivity.id == activity.id) {
                    activity.title = res.data.title
                    activity.description = res.data.description
                    return res.data
                }
                return prevActivity
            }))
            setSuccess('Actividad editada')
            setError('')
        },
        onError: err => {
            setError('No se pudo editar actividad, inténtelo otra vez')
            setSuccess('')
        }
    })

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
        <Button onClick={() => setOpen(true)} color='violet-950' className="hover:bg-violet-900">Editar Actividad</Button>
        <ActivityForm 
            activity={activity}
            assignature={assignature}
            open={open}
            setOpen={setOpen}
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            update={updateActivityMutation}
        />
    </div>
    </>
    }
</div>
  )
}

export default UpdateActivity