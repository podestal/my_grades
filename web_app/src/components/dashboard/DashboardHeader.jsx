import CreateActivity from "../activities/CreateActivity"



const DashboardHeader = ({ assignature }) => {

  return (
    <div className="w-full flex items-center justify-center my-20 gap-12">
        <h2 className="text-white text-6xl font-poppins">Registro de Evaluación {assignature.title}</h2>
        <CreateActivity 
            assignature={assignature}
        />
    </div>
  )
}

export default DashboardHeader