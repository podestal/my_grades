import Hero from "./Hero"
import ContactSection from "./ContactSection"
import Why from "./Why"
import Footer from "./Footer"
import FAQ from "./FAQ"
import Features from "./Features"
import { features } from "../../constants"

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className="flex justify-center items-start bg-primary">
        <div className="xl:max-w-[1480px] w-full"> 
          <Hero />
        </div>
      </div>
      <div className="bg-primary sm:px-16 px-6 flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full text-white">
          {features.map( feature => (<Features key={feature.title} feature={feature}/>))}
          <FAQ />
          <ContactSection />
          <Why />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home


