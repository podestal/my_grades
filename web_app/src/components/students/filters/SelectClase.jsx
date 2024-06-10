import React from 'react'
import { Select, SelectItem } from '@tremor/react'
import Selector from '../../../utils/Selector'

const SelectClase = ({ clases, clase, setClase }) => {

    const randomKey = Math.random()

  return (
    <div className="flex flex-col  items-center">
        <Selector 
            label={'Clase'}
            value={clase}
            setter={setClase}
            items={clases}
            everything={'Todas las clases'}
        />
    </div>
            //     <Selector 
            //     label={'Categoría'} 
            //     value={selectedCategory} 
            //     setter={setSelectedCategory} 
            //     items={categories} 
            //     error={selectedCategoryError}
            //     errorMsg={'Necesita seleccionar una categoría'}
            // />
  )
}

export default SelectClase