import Hero from "./Hero"
import Header from "./Header"

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Header />
        </div>
      </div>
      <div className="flex justify-center items-start bg-primary">
        <div className="xl:max-w-[1280px] w-full"> 
          <Hero />
        </div>
      </div>
    </div>
  )
}

export default Home

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

{/* <div className='bg-primary w-full overflow-hidden'>
<div className={`${styles.paddingX} ${styles.flexCenter}`}>
  <div className={`${styles.boxWidth}`}>
    <Navbar />
  </div>
</div>
<div className={`bg-primary ${styles.flexStart}`}>
  <div className={`${styles.boxWidth}`}>
    <Hero />
  </div>
</div>
<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
  <div className={`${styles.boxWidth}`}>
    <Stats />
    <Business />
    <Billing />
    <CarDeal />
    <Testimonials />
    <Clients />
    <CTA />
    <Footer />
  </div>
</div>
</div> */}