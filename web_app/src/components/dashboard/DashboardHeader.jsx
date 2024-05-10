import CreateActivity from "./dashboardComponents/CreateActivity"

const DashboardHeader = ({ assignature }) => {
  return (
    <div className="w-full flex items-center justify-center my-20 gap-12">
        <h2 className="text-white text-6xl font-poppins">Tabla de Actividades</h2>
        <CreateActivity 
            assignature={assignature}
        />
    </div>
  )
}

export default DashboardHeader