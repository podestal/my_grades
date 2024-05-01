import { useNavigate } from "react-router-dom"

const ActivityCard = ({ activity }) => {

    const navigate = useNavigate()

  return (
    <div 
        onClick={() => navigate('/activity', { replace: true, state: activity})}
        className='text-center  font-bold mx-auto my-12 py-8 w-[300px] border border-purple-950  rounded-[35px] cursor-pointer hover:bg-purple-950 shadow-violet-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]'>{activity.title}</div>
  )
}

export default ActivityCard