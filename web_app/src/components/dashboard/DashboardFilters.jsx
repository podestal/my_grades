import { RiSearchLine } from "@remixicon/react"
import { TextInput, Select, SelectItem } from "@tremor/react"
import Selector from "../../utils/Selector"
import useCategories from "../../hooks/useCategories"
import { competenciesData } from "../../data/competencies"
import { capacitiesData } from "../../data/capacities"
import { quartersData } from "../../data/quarters"

const DashboardFilters = ({ assignatureArea, filter, setFilter, selectedCapacity, setSelectedCapacity, selectedCompetency, setSelectedCompetency, selectedCategory, setSelectedCategory, quarter, setQuarter }) => {

    const { categories } = useCategories()
    const competencies = competenciesData.filter( competency => competency.area == assignatureArea)
    const capacities = capacitiesData.filter( capacity => capacity.competence == selectedCompetency)

  return (
    <div className="flex flex-col gap-12">
        <div className='flex w-full justify-start gap-16'>
            <div className='w-full'>
                <p className='text-xl mb-4'>Competencias</p>
                <Select value={selectedCompetency} onValueChange={ value => setSelectedCompetency(value)}>
                    <SelectItem value='all'>Todas las actividades</SelectItem>
                    {competencies.map( competency => (
                        <SelectItem value={competency.id}  key={competency.id}>{competency.title}</SelectItem>
                    ))}
                </Select>
            </div>
            <div className='w-full'>
                <p className='text-xl mb-4'>Capacities</p>
                <Select value={selectedCapacity} onValueChange={ value => setSelectedCapacity(value)}>
                    <SelectItem value='all'>Todas las actividades</SelectItem>
                    {capacities.map( capacity => (
                        <SelectItem value={capacity.id}  key={capacity.id}>{capacity.title}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
        <div className='flex w-full justify-center gap-16 '>
            <div>
                <p className='text-xl mb-4'>Buscar Alumno</p>
                <TextInput icon={RiSearchLine} placeholder='Buscar Alumno' className='mb-12 w-[240px]' value={filter} onValueChange={value => setFilter(value)}/>
            </div>
            <Selector 
                label={'Categorías'}
                value={selectedCategory}
                setter={setSelectedCategory}
                items={categories}
                everything={'Todas las categorías'}
            />
            <Selector 
                label={'Bimestre'}
                value={quarter}
                setter={setQuarter}
                items={quartersData}
            />
        </div>
    </div>
  )
}

export default DashboardFilters