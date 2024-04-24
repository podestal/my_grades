import academicProgress from '../../assets/academic-progress.png'

const AcademicAccess = () => {
  return (
    <section className='flex md:flex-row flex-col sm:py-16 py-6'>
        <div className='flex-1 flex flex-col justify-center items-start'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Accesso 24/7 al progreso académico</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nulla fugit dolorem vel repudiandae ut blanditiis laboriosam obcaecati molestiae, corporis animi saepe reprehenderit minus aperiam accusantium laudantium. Aut, repellat dolore!</p>
        </div>
        <div className='flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative'>
            <img src={academicProgress} alt="Academic Progress" className="w-[100%] h-[100%]"/>
        </div>
    </section>
  )
}

export default AcademicAccess

// boxWidth: "xl:max-w-[1280px] w-full",
  
// heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
// paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

// flexCenter: "flex justify-center items-center",
// flexStart: "flex justify-center items-start",

// paddingX: "sm:px-16 px-6",
// paddingY: "sm:py-16 py-6",
// padding: "sm:px-16 px-6 sm:py-12 py-4",

// marginX: "sm:mx-16 mx-6",
// marginY: "sm:my-16 my-6",

//LAYOUT

// section: `flex md:flex-row flex-col ${styles.paddingY}`,
// sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

// sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
// sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

// sectionInfo: `flex-1 ${styles.flexStart} flex-col`,