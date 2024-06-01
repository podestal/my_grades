import { useLocation } from 'react-router-dom'
import GetGrades from '../grades/GetGrades'
import useGrades from '../../hooks/useGrades'
import UpdateActivity from './UpdateActivity'
import useAssignatures from '../../hooks/useAssignatures'
import useActivities from '../../hooks/useActivities'


const SingleActivity = () => {

    const activity = useLocation().state
    const { assignatures } = useAssignatures()
    const assignature = assignatures?.find( assignature => assignature.id == activity?.assignature)
    const { activities } = useActivities()
    const currentActivity = activities.find( currentActivity => currentActivity.id == activity.id)
    const { grades } = useGrades()

  return (
    <div className='text-white min-h-[100vh] md:w-[1276px] mt-[5rem] w-full relative max-w-[1450px] mx-auto'>
        {console.log('activity',activity)}
            <div className="flex w-full justify-between items-start">
                <h2 className="text-5xl font-poppins ">{activity.title}:</h2>
                <p className="text-lg flex-1 mx-6">{activity.description}</p>
                <UpdateActivity 
                    assignature={assignature}
                    activity={activity}
                />
            </div>
        <GetGrades 
            activity={activity}
        />
    </div>
  )
}

export default SingleActivity