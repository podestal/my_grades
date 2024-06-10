import { TextInput } from "@tremor/react"
import { RiSearchLine } from "@remixicon/react"

const FilterStudent = ({filter, setFilter}) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <p className='text-xl mb-4 text-center'>Buscar Alumno</p>
        <TextInput autoComplete='false' icon={RiSearchLine} placeholder='Buscar Alumno' className='mb-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
    </div>
  )
}

export default FilterStudent