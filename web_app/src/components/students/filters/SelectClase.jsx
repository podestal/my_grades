import React from 'react'
import { Select, SelectItem } from '@tremor/react'
import Selector from '../../../utils/Selector'

const SelectClase = ({ clases, clase, setClase, filter }) => {

  return (
    <div className="flex flex-col  items-center">
      {console.log('filter', filter)}
        <Selector 
            label={'Clase'}
            value={clase}
            setter={setClase}
            items={filter ? clases.filter( singleClase => filter.indexOf(singleClase.id) >= 0) : clases}
        />
    </div>
  )
}

export default SelectClase