import { AccordionList, AccordionHeader, AccordionBody, Accordion } from "@tremor/react"
import moment from "moment"
import Attendance from "./Attendance"

const Attendances = ({ attendances }) => {

    let late = 0
    let unattend = 0
    const foramttedDate = moment("2024-05-26").format('MMMM Do')

    attendances.length > 0 && attendances.map( attendance => {
        if (attendance.status == 'N') {
            unattend++
        } else if (attendance.status == 'L') {
            late++
        }

    })

  return (
    <AccordionList>
        <Accordion className="border-none w-[50%]">
            <AccordionHeader className="bg-primary">
            <div className='flex w-full gap-12 justify-start items-center'>
                <p className='text-xl font-bold font-montserrat'>Faltas: <span className='text-red-500 ml-2'>{unattend}</span></p>
                <p className='text-xl font-bold font-montserrat'>Tardanzas: <span className='text-amber-500 ml-2'>{late}</span></p>
            </div>
            </AccordionHeader>
            <AccordionBody className="bg-primary w-full">
                {attendances.map( attendance => (
                    <Attendance 
                        key={attendance.id}
                        attendance={attendance}
                    />
                ))}
            </AccordionBody>
        </Accordion>
    </AccordionList>
  )
}

{/* <AccordionList>
        <Accordion className='my-6 '>
            <AccordionHeader> <p className='text-2xl font-montserrat my-4'>{assignature.title}</p></AccordionHeader>
            <AccordionBody>
                <BarChart 
                    data={data}
                    index="name"
                    categories={['calificación']}
                    valueFormatter={dataFormated}
                    colors={['blue']}
                    showAnimation={true}
                    className='text-white mb-12'
                    maxValue={4}
                    showXAxis={false}
                    barCategoryGap={30}
                    tickGap={30}
                    intervalType={'preserveStartEnd'}
                />
                {averages
                    .map(average => (
                        <div className='flex-col w-[95%] mx-4 my-6'>
                            <div className='w-full flex justify-between my-2'>
                                <p className='text-white font-bold text-lg'>{competences[average.competence]}</p>
                                <p className={`text-md font-bold text-xl
                                ${average.calification == 'C' && 'text-red-500'}
                                ${average.calification == 'B' && 'text-amber-300'}
                                ${average.calification == 'A' && 'text-yellow-500'}
                                ${average.calification == 'AD' && 'text-green-500'}
                                `}>{average.calification}</p>
                            </div>
                            <div className='w-full flex flex-col justify-between'>
                                <p className=' text-slate-400 font-bold text-lg mb-2'>Conclusión descriptiva:</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laboriosam temporibus nobis fuga beatae enim ex sint placeat dolorem, accusantium dolores iste error? Necessitatibus nihil quidem hic consequuntur expedita natus!</p>
                            </div>
                        </div>
                    ))
                }
            </AccordionBody>
        </Accordion>
    </AccordionList> */}

export default Attendances