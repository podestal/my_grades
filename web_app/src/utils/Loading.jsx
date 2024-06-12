import { Bars } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='text-white flex flex-col w-full text-2xl h-[100vh] gap-12 justify-center items-center'>
      <h2 className='text-6xl font-poppins text-white'>Un momento porfavor</h2>
      <Bars 
          color='rgb(91 33 182)'
      />
    </div>
  )
}

export default Loading