import React from 'react'
import { BarChart } from '@tremor/react'
import { numericalRepresentation, alphabeticalRepresentation } from '../../data/calculateAverage'
import { getFilteredCompetences } from '../../data/competencies'

const Averages = ({ averages, assignature, competences }) => {

    const filteredCompetencies = getFilteredCompetences(assignature.area)
    const data = filteredCompetencies.map( comp => ({ name: comp.title, 'calificación': 0 }))
    // const data = averages.map( average => ({name: competences[average.competence], 'calificación': numericalRepresentation[average.calification]}))
    const dataFormated = (value) => {
        return alphabeticalRepresentation[value]
    }

  return (
    <div>
        <p className='text-2xl font-montserrat my-4'>{assignature.title}</p>
        {console.log('filteredCompetencies', filteredCompetencies)}
        <BarChart 
            data={data}
            index="name"
            categories={['calificación']}
            valueFormatter={dataFormated}
            colors={['blue']}
            // yAxisWidth={160}
            showAnimation={true}
            className='text-white '
            maxValue={4}
            // showYAxis={false}
            showXAxis={false}
            barCategoryGap={30}
            tickGap={30}
            enableLegendSlider={true}
            intervalType={'preserveStartEnd'}
            // aria-label='hhhhh'
        />
        {averages
            .map(average => (
                <div className='flex-col w-[756px] mx-4 my-6'>
                    <div className='w-full flex justify-between my-2'>
                        <p className='font-bold text-lg'>{competences[average.competence]}</p>
                        <p className={`text-md font-bold text-xl
                        ${average.calification == 'C' && 'text-red-500'}
                        ${average.calification == 'B' && 'text-amber-300'}
                        ${average.calification == 'A' && 'text-yellow-500'}
                        ${average.calification == 'AD' && 'text-green-500'}
                        `}>{average.calification}</p>
                    </div>
                    <div className='w-full flex flex-col justify-between'>
                        <p className='font-bold text-lg mb-2'>Conclusión descriptiva:</p>
                        <p>{average.conclusion} dfadfasdfadfadfasdfasdfasdfasdf Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laboriosam temporibus nobis fuga beatae enim ex sint placeat dolorem, accusantium dolores iste error? Necessitatibus nihil quidem hic consequuntur expedita natus!</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Averages