import React from 'react'
import { competenciesData } from '../../data/competencies'

const Averages = ({ averages, assignature, competences }) => {

  return (
    <div>
        <p>{assignature.title}</p>
        {averages
            .filter(average => average.assignature == assignature.id)
            .map(average => <p>{competences[average.competence]}: {average.calification}</p>)
        }
    </div>
  )
}

export default Averages