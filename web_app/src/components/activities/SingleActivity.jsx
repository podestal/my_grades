import { useLocation } from 'react-router-dom'
import GetGrades from '../grades/GetGrades'
import useGrades from '../../hooks/useGrades'


const SingleActivity = () => {

    const activity = useLocation().state
    const { grades } = useGrades()

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>{console.log('props',activity)}
    {console.log('Grades from context', grades)}
        <GetGrades 
            activity={activity}
        />
    </div>
  )
}

export default SingleActivity