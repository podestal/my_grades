import AssignatureSelector from "../../components/activities/AssignatureSelector"
import QuarterSelector from "../../components/activities/QuarterSelector"
import { useState } from "react"
import { styles } from "../../utils/styles"
import useActivities from "../../hooks/useActivities"
import GetActivities from "../../components/getters/GetActivities"
import Activities from "../../components/activities/Activities"

const ActivityPage = () => {

    const [assignature, setAssignature] = useState('')
    const [quarter, setQuarter] = useState('Q2')
    const { activities, setActivities } = useActivities()
    const filteredActivitiesByAssignature = activities.length > 0 && activities.filter( activity => activity.assignature == assignature)



  return (
    <div className="text-white min-h-[100vh] mt-[5rem] w-full relative">
        <h2 className={`my-12 ${styles.gradientTitle}`}>Actividades</h2>
        <div className="flex items-center justify-center gap-12 w-full mx-auto">
            <AssignatureSelector 
                assignature={assignature}
                setAssignature={setAssignature}
            />
            <QuarterSelector 
                quarter={quarter}
                setQuarter={setQuarter}
            />
        </div>
        {assignature && 
            <>
                {filteredActivitiesByAssignature.length == 0 
                ? 
                <GetActivities 
                    assignature={assignature}
                    setActivities={setActivities}
                />
                : 
                <Activities 
                    assignature={assignature}
                    quarter={quarter}
                    activities={activities}
                />
                }
            </>
        }
    </div>
  )
}

export default ActivityPage