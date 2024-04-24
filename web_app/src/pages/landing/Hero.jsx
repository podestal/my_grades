import React from 'react'
import heroImg from '../../assets/hero-iso.png'

const Hero = () => {
  return (
    <section id='main' className='flex lg:flex-row justify-between items-center flex-col sm:px-16 px-6 w-full mx-auto'>
        <div className='flex-1 flex justify-center lg:items-start items-center px-6 sm:px-16 xl:px-0 flex-col lg:mt-0 mt-10'>
            <h1 className='font-poppins text-white font-bold lg:text-[70px] lg:text-start text-center text-[50px] lg:leading-[7rem] leading-[5rem] max-w-[620px]'>
                Lorem ipsum <span className='text-gradient'>consectetur</span> adipisicing elit.
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nobis harum, dolore excepturi facere laboriosam quisquam officia ips */}
            </h1>
        <div className='lg:block hidden '>
        <p className='cursor-pointer px-10 text-white py-4 bg-violet-950 rounded-full text-xl mt-8 font-bold relative z-10 hover:bg-violet-800'>Empezar</p>
        </div>
        </div>
        <div className='flex lg:justify-end justify-center items-center w-full flex-wrap'>
            <img src={heroImg} alt="" className="lg:w-[750px] lg:h-[800px] w-[550px] h-[600px] relative z-[5] flex-shrink-0"  />
            <div className="absolute z-[0] w-[60%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[0] w-[30%] h-[35%] bottom-0 left-0 white__gradient" />
            {/* <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
        </div>
        <div className='block lg:hidden'>
          <p className='cursor-pointer px-10 text-white py-4 bg-violet-950 rounded-full text-xl mt-0 font-bold hover:bg-violet-800'>Empezar</p>
        </div>
    </section>
  )
}

export default Hero