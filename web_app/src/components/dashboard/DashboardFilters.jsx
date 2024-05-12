import { RiSearchLine } from "@remixicon/react"
import { TextInput, Select, SelectItem } from "@tremor/react"
import Selector from "../../utils/Selector"
import useCategories from "../../hooks/useCategories"
import { competenciesData } from "../../data/competencies"

const DashboardFilters = ({ assignatureArea, filter, setFilter, selectedCompetency, setSelectedCompetency, selectedCategory, setSelectedCategory, quarter, setQuarter }) => {

    const { categories } = useCategories()
    const competencies = competenciesData.filter( competency => competency.area == assignatureArea)

  return (
    <div className='flex w-full justify-start gap-16'>
        <div>
            <p className='text-xl mb-4'>Buscar Alumno</p>
            <TextInput icon={RiSearchLine} placeholder='Buscar Alumno' className='mb-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
        </div>
        <div className='w-full'>
            <p className='text-xl mb-4'>Competencias</p>
            <Select value={selectedCompetency} onValueChange={ value => setSelectedCompetency(value)}>
                <SelectItem value='all'>Todas las actividades</SelectItem>
                {competencies.map( competency => (
                    <SelectItem value={competency.id}  key={competency.id}>{competency.title}</SelectItem>
                ))}
            </Select>
        </div>
        <Selector 
            label={'Categorías'}
            value={selectedCategory}
            setter={setSelectedCategory}
            items={categories}
            everything={'Todas las categorías'}
        />
        <div className='flex flex-col'>
            <p className="text-xl font-poppins mb-4">Bimestre</p>
            <Select value={quarter} onValueChange={ value => setQuarter(value)}>
                <SelectItem value="Q1">B1</SelectItem>
                <SelectItem value="Q2">B2</SelectItem>
                <SelectItem value="Q3">B3</SelectItem>
                <SelectItem value="Q4">B4</SelectItem>
            </Select>
        </div>
    </div>
  )
}

export default DashboardFilters