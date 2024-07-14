const Features = ({ feature }) => {
  return (
    <section id='features' className={`flex max-lg:flex-col sm:py-16 py-6 gap-10 ${feature.styles}`}>
        <div className='flex-1 flex flex-col justify-center items-start max-lg:text-center'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>{feature.title}</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>{feature.description}</p>
        </div>
        <div className='flex-1 flex justify-center items-center md:mt-0 mt-10 relative'>
            <img src={feature.imgUrl} alt="Academic Progress" className="w-[100%] h-[100%] rounded-3xl"/>
        </div>
    </section>
  )
}

export default Features