import { useLocation } from 'react-router-dom'

const SingleActivity = () => {

    const activity = useLocation().state

  return (
    <div className='text-white min-h-[100vh] mt-[5rem] w-full relative'>{console.log('props',activity)}
        SingleActivity
    </div>
  )
}

export default SingleActivity