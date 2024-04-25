import Hero from "./Hero"
import Header from "./Header"
import AcademicAccess from "./AcademicAccess"
import Attandance from "./Attandance"
import FAQ from "./FAQ"

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <Header />
        </div>
      </div>
      <div className="flex justify-center items-start bg-primary">
        <div className="xl:max-w-[1480px] w-full"> 
          <Hero />
        </div>
      </div>
      <div className="bg-primary sm:px-16 px-6 flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full text-white">
          <AcademicAccess />
          <Attandance />
          <FAQ />
          <ul>
            <li>- Crea actividades y anuncios</li>
            <li>- Registro de faltas y tardanzas</li>
            <li>- Visualiza la información</li>
            <li>- Maténgase informado</li>
            <li>- Porqué usar la app</li>
            <li>- Footer</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home

