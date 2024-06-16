import React from 'react'
import { Select, SelectItem } from '@tremor/react'
import Selector from '../../../utils/Selector'
import { getClasesForInstructors } from '../../../data/getClasesForInstructors'

const SelectClase = ({ clases, clase, setClase, filter }) => {

  const instructorClases = getClasesForInstructors(clases, filter) || []

  return (
    <div className="flex flex-col  items-center">
        {console.log('filter',filter)}
        <Selector 
            label={'Clase'}
            value={clase}
            setter={setClase}
            items={filter ? instructorClases : clases}
        />
    </div>
  )
}

export default SelectClase