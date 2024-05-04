import { Bars } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='h-[100vh] w-full flex flex-col justify-center items-center gap-10'>
      <h2 className='text-6xl font-poppins'>Un momento porfavor</h2>
      <Bars 
          color='rgb(91 33 182)'
      />
    </div>
  )
}

export default Loading