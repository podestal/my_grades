import useCategories from "../../hooks/useCategories"
import useActivities from "../../hooks/useActivities"
import { useState } from "react"
import { Button } from "@tremor/react"
import { updateActivity } from "../../api/api"
import GetCategories from "../getters/GetCategories"
import ActivityForm from "./ActivityForm"
import { useQueryClient, useMutation } from "@tanstack/react-query"

const UpdateActivity = ({ assignature, activity, editActivity, setEditActivity }) => {


    const queryClient = useQueryClient()

    // LOCAL STATE
    const { activities, setActivities } = useActivities()
    // const { categories, setCategories } = useCategories()

    // // PANEL HANDLER
    // const [open, setOpen] = useState(editActivity)
    
    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [disable, setDisable] = useState(false)
    // Categories
    const categories = queryClient.getQueriesData('categories')

    // Mutation Update
    const { mutate: updateActivityMutation } = useMutation({
        mutationFn: data => updateActivity(data),
        onSuccess: res => {
            console.log('Activity update response',res.data)
            setDisable(true)
            queryClient.setQueryData(['activities'], prevCats => prevCats.map( prevCat => {
                if (prevCat.id == activity.id) {
                    prevCat = {...prevCat, ...res.data}
                }
                return prevCat
            }))
            // setActivities( preActivities => preActivities.map( prevActivity => {
            //     if (prevActivity.id == activity.id) {
            //         activity.title = res.data.title
            //         activity.description = res.data.description
            //         return res.data
            //     }
            //     return prevActivity
            // }))
            setSuccess('Actividad editada')
            setError('')
        },
        onError: err => {
            setError('No se pudo editar actividad, inténtelo otra vez')
            setSuccess('')
            setDisable(false)
        }
    })

  return (
//     <div>
//     {categories.length == 0 
//     ?
//     <GetCategories 
//         setCategories={setCategories}
//     />
//     :
//     <>
//     <div className='flex items-start justify-center'>
//         {/* <Button onClick={() => setEditActivity(true)} color='violet-950' className="hover:bg-violet-900">Editar Actividad</Button> */}
//         <ActivityForm 
//             activity={activity}
//             assignature={assignature}
//             open={editActivity}
//             setOpen={setEditActivity}
//             success={success}
//             setSuccess={setSuccess}
//             error={error}
//             setError={setError}
//             update={updateActivityMutation}
//             categories={categories}
//         />
//     </div>
//     </>
//     }
// </div>
    <ActivityForm 
        activity={activity}
        assignature={assignature}
        open={editActivity}
        setOpen={setEditActivity}
        success={success}
        setSuccess={setSuccess}
        error={error}
        setError={setError}
        update={updateActivityMutation}
        categories={categories}
        setDisable={setDisable}
        disable={disable}
    />
  )
}

export default UpdateActivity