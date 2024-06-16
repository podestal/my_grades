import { Dialog, DialogPanel, Divider, DonutChart, Legend, BadgeDelta, AreaChart } from "@tremor/react"
import CloseButton from "../../../utils/CloseButton"
import useStudent from "../../../hooks/useStudents"
import { numericalRepresentation } from "../../../data/calculateAverage"

const alphabeticalRepresentation = {
    '4': 'AD',
    '3': 'A',
    '2': 'B',
    '1': 'C',
    '0': 'NA'
}

const StudentSummaryModal = ({ open, setOpen, student, setStudentSummary, activities, quarter }) => {

    let unattendance = 0
    let late = 0

    student?.atendances?.map( attendance => {
        if (attendance.status == 'N') {
            unattendance++
        } else if (attendance.status == 'L') {
            late++
        }
    })

    let participations = 0
    student?.participations
        ?.filter( participation => participation?.quarter == quarter)
        ?.map( participation => {
            participations++
    })

    const colorsDictionary = {
        'A': 'yellow-300',
        'AD': 'green-500',
        'B': 'amber-500',
        'C': 'red-500',
    }
    const activitiesIds = activities.map( activity => activity.id)
    const gradesObj = {}
    const gradesData = []
    const greadesForDonutChart = []
    const conditionalColors = []
    const legendCategories = []
    let activitiesCount = 0
    student?.grades
        .filter( grade => activitiesIds.indexOf(grade.activity) >= 0)
        .map( grade => {
            gradesData.push({ 'activity': grade?.activity.toString(), 'calification': numericalRepresentation[grade.calification] })
            if (grade.calification != 'NA') {
                activitiesCount++
                if (gradesObj[grade.calification]) {
                    gradesObj[grade.calification] += 1
                } else {
                    gradesObj[grade.calification] = 1
                }
            }
        })
    
    for (const [key, value] of Object.entries(gradesObj)) {
        greadesForDonutChart.push({'name': key, value, color: colorsDictionary[key]})
    
    }

    greadesForDonutChart
    .sort((a ,b) => {
        if (a.name < b.name) {
            return -1
        } 
        if (a.name > b.name) {
            return 1
        }
        return 0
    })
    .map( grade => {
        legendCategories.push(`${grade.name}: ${grade.value}`)
        conditionalColors.push(grade.color)
    })

    const dataFormated = (value) => {
        return alphabeticalRepresentation[value]
    }

    const handleClosePanel = () => {
        setOpen(false)
        setStudentSummary(false)
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        {console.log('quarter', quarter)}
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            <CloseButton handleClose={handleClosePanel}/>
            <h2 className="text-white text-4xl text-center font-poppins">Resumen de Progreso</h2>
            <Divider></Divider>
            <div className="flex w-full justify-center gap-4 items-center mb-6">
                <h3 className="text-white text-3xl text-center font-poppins">{student.first_name} {student.last_name}</h3>
                <BadgeDelta deltaType='increase' isIncreasePositive={true}></BadgeDelta>
            </div>
            <div className="flex justify-between gap-6 w-full">
                <div className="w-[65%]">
                    <DonutChart 
                        data={greadesForDonutChart}
                        variant="donut"
                        showAnimation={true}
                        label={activitiesCount > 1 ? `${activitiesCount} actividades` : `${activitiesCount} actividad`}
                        showLabel={true}
                        colors={conditionalColors}
                    />
                    <Legend
                        categories={legendCategories}
                        colors={conditionalColors}
                        className="mt-4 w-full flex justify-center"
                    />
                </div>
                <div className="flex items-start justify-between w-[35%] my-4 mx-4 gap-6 text-white">
                    <div className="flex flex-col justify-center items-stretch w-full gap-4">
                        <p>Faltas:</p>
                        <p>Tardanzas:</p>
                        <p>Participaciones:</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className={`${unattendance == 0 ? 'text-green-500' : 'text-red-500'} ml-2`}>{unattendance}</span>
                        <span className={`${late == 0 ? 'text-green-500' : 'text-amber-500'} ml-2`}>{late}</span>
                        <p className="text-green-500 ml-2">{participations}</p>
                    </div>
                </div>


            </div>
            <AreaChart
                    className="h-80"
                    data={gradesData}
                    index="activity"
                    categories={['calification']}
                    colors={['indigo']}
                    valueFormatter={dataFormated}
                    yAxisWidth={60}
                    onValueChange={(v) => console.log(v)}
                    showXAxis={false}
                />
        </DialogPanel>
    </Dialog>
  )
}

export default StudentSummaryModal