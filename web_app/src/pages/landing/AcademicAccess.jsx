import academicProgress from '../../assets/academic-progress.png'

const AcademicAccess = () => {
  return (
    <section id='features' className='flex flex-row-reverse sm:py-16 py-6'>
        <div className='flex-1 flex flex-col justify-center items-start'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Accesso 24/7 al progreso académico</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Los padres pueden acceder a la información académica de sus hijos en cualquier momento.</p>
        </div>
        <div className='flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative'>
            <img src={academicProgress} alt="Academic Progress" className="w-[100%] h-[100%] rounded-3xl"/>
        </div>
    </section>
  )
}

export default AcademicAccess
