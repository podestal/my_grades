import attendance from '../../assets/attendance.png'

const Attandance = () => {
  return (
    <section className='flex md:flex-row flex-col sm:py-16 py-6'>
        <div className='flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative'>
            <img src={attendance} alt="attendance" className="w-[100%] h-[100%] rounded-3xl"/>
        </div>
        <div className='flex-1 flex flex-col justify-center items-start'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Registro de faltas y tardanzas</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nulla fugit dolorem vel repudiandae ut blanditiis laboriosam obcaecati molestiae, corporis animi saepe reprehenderit minus aperiam accusantium laudantium. Aut, repellat dolore!</p>
        </div>
    </section>
  )
}

export default Attandance