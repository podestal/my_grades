import React from 'react'
import { competenciesData } from '../../data/competencies'

const Averages = ({ averages, assignature, competences }) => {

  return (
    <div>
        <p>{assignature.title}</p>
        {averages
            .filter(average => average.assignature == assignature.id)
            .map(average => (
                <div className='w-[756px] flex justify-between'>
                    <p>{competences[average.competence]}:</p>
                    <p>{average.calification}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Averages