import React from 'react'
import heroImg from '../../assets/hero-iso.png'

const Hero = () => {
  return (
    <section id='main' className='flex md:flex-row justify-between items-center flex-col sm:px-16 px-6 w-full mx-auto'>
        <div className='flex-1 flex justify-center items-start px-6 sm:px-16 xl:px-0 flex-col ml-12'>
            <h1 className='font-poppins text-white font-bold text-[80px] leading-[7rem] max-w-[620px]'>
                Lorem ipsum <span className='text-gradient'>consectetur</span> adipisicing elit officia ips.
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nobis harum, dolore excepturi facere laboriosam quisquam officia ips */}
            </h1>
            <p className='cursor-pointer px-10 text-white py-4 bg-violet-950 rounded-full text-xl mt-8 font-bold hover:bg-slate-500'>Empezar</p>
        </div>
        <div className='text-white flex justify-center items-center mx-auto'>
            <img src={heroImg} alt="" className="w-[850px] h-[850px] relative z-[5]"  />
            <div className="absolute z-[0] w-[60%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[0] w-[30%] h-[35%] bottom-0 left-0 white__gradient" />
            {/* <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
        </div>
    </section>
  )
}

export default Hero