import { useLocation } from 'react-router-dom'
import GetGrades from '../grades/GetGrades'


const SingleActivity = () => {

    const activity = useLocation().state

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>{console.log('props',activity)}
        <GetGrades 
            activity={activity}
        />
    </div>
  )
}

export default SingleActivity