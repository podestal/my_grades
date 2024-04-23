import Hero from "./Hero"

const Home = () => {
  return (
    <div className="flex justify-center items-start">
      <div className="xl:max-w-[1280px] min-w-full">
        <Hero />
      </div>
    </div>
  )
}

export default Home