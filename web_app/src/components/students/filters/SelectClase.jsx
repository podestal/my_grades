import React from 'react'
import { Select, SelectItem } from '@tremor/react'
import Selector from '../../../utils/Selector'

const SelectClase = ({ clases, clase, setClase }) => {

  return (
    <div className="flex flex-col  items-center">
        <Selector 
            label={'Clase'}
            value={clase}
            setter={setClase}
            items={clases}
        />
    </div>
  )
}

export default SelectClase