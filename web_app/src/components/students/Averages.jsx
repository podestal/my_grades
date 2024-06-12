import React from 'react'
import { BarChart, AccordionList, Accordion, AccordionHeader, AccordionBody } from '@tremor/react'
import { numericalRepresentation } from '../../data/calculateAverage'
import { getFilteredCompetences } from '../../data/competencies'

const alphabeticalRepresentation = {
    '4': 'AD',
    '3': 'A',
    '2': 'B',
    '1': 'C',
    '0': 'NA'
}

const Averages = ({ averages, assignature, competences }) => {

    const filteredCompetencies = getFilteredCompetences(assignature.area)
    const data = filteredCompetencies.map( comp => {
        const average = averages.find( average => average.competence == comp.id)
        const calification = average ? numericalRepresentation[average.calification] : 0
        return { name: comp.title, 'calificación': calification }
    })

    const dataFormated = (value) => {
        return alphabeticalRepresentation[value]
    }

  return (
    <AccordionList>
        <Accordion className='my-6 '>
            <AccordionHeader> <p className='text-2xl font-montserrat my-4'>{assignature.title}</p></AccordionHeader>
            <AccordionBody className=''>
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
    </AccordionList>
  )
}

export default Averages