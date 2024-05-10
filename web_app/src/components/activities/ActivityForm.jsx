import { useState } from "react"
import { Button, Dialog, DialogPanel, DatePicker, Select, SelectItem } from "@tremor/react"
import { es } from 'date-fns/locale'
import moment from "moment"
import useCategories from "../../hooks/useCategories"
import { competenciesData } from "../../data/competencies"
import { capacitiesData } from "../../data/capacities"
import useAuth from "../../hooks/useAuth"
import InputText from "../../utils/InputText"
import GenericCallout from "../../utils/GenericCallout"
import CloseButton from "../../utils/CloseButton"

const ActivityForm = ({ activity, assignature, open, setOpen, success, error, create, update }) => {

    // USER
    const { user } = useAuth()

    // LOCAL CATEGORIES
    const { categories } = useCategories()

    // MODEL FIELDS
    const [title, setTitle] = useState(activity && activity.title || '')
    const [description, setDescription] = useState(activity && activity.description || '')
    const [date, setDate] = useState(activity && new Date(activity.due_date) || new Date())
    const [selectedCategory, setSelectedCategory] = useState(activity && activity.category || '')
    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [selectedCompetency, setSelectedCompetency] = useState(activity && activity.competence || '')
    const capacities = selectedCompetency && capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const [selectedCapacity, setSelectedCapacity] = useState(activity && activity.capacity || '')
    const [selectedQuarter, setSelectedQuarter] = useState('Q2')

    // VALIDATION ERROR HANDLING
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [dateError, setDateError] = useState(false)

    const handleClosePanel = () => {
        if (create) {
            setTitle('')
            setDescription('')
            setDate(new Date)
            setSelectedCategory('')
            setSelectedCompetency('')
            setSelectedCapacity('')
            setSelectedQuarter('')
        } 
        setOpen(false)
    }

    const handleCreate = () => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        create({
            token: user.access,
            activity: {
                title,
                description,
                assignature: assignature.id,
                quarter: selectedQuarter,
                due_date: formattedDate,
                competence: selectedCompetency,
                capacity: selectedCapacity,
                category: selectedCategory,
            }
        })
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel
            className="relative flex flex-col gap-4 items-center"
        >
            <GenericCallout conditionalMsg={error} title={'Error'} color={'red'}/>
            <GenericCallout conditionalMsg={success} title={activity ? 'Actividad editada' :'Actividad creada'} color={'teal'}/>
            <CloseButton handleClose={handleClosePanel}/>
            <h2 className="text-white mb-6 text-3xl text-center">{activity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <InputText 
                label={'Título'}
                value={title}
                setter={setTitle}
                error={titleError}
                errorMsg={"Se necesita un título para crear la actividad"}
            />
            <InputText 
                label={'Descriptión'}
                value={description}
                setter={setDescription}
                error={descriptionError}
                errorMsg={"Se necesita el porcentaje para crear la categoría"}
            />
            <p className="text-white font-poppins">Fecha de entrega</p>
            <DatePicker 
                value={date}
                onValueChange={value => setDate(value)}
                locale={es}
            />
            <p className="text-white font-poppins">Bimestre</p>
            <Select value={selectedQuarter} onValueChange={ value => setSelectedQuarter(value)}>
                <SelectItem value="Q1">B1</SelectItem>
                <SelectItem value="Q2">B2</SelectItem>
                <SelectItem value="Q3">B3</SelectItem>
                <SelectItem value="Q4">B4</SelectItem>
            </Select>
            <p className="text-white font-poppins">Categoría</p>
            <Select value={selectedCategory} onValueChange={ value => setSelectedCategory(value)}>
                {categories && categories.map( category => (
                    <SelectItem value={category.id}  key={category.id}>{category.title}</SelectItem>
                ))}
            </Select>
            <p className="text-white font-poppins">Competencia</p>
            <Select value={selectedCompetency} onValueChange={ value => setSelectedCompetency(value)}>
                {competencies.map( competency => (
                    <SelectItem value={competency.id}  key={competency.id}>{competency.title}</SelectItem>
                ))}
            </Select>
            {selectedCompetency && 
            <>
                <p className="text-white font-poppins">Capacidad</p>
                <Select value={selectedCapacity} onValueChange={ value => setSelectedCapacity(value)}>
                    {capacities.map( capacity => (
                        <SelectItem value={capacity.id}  key={capacity.id}>{capacity.title}</SelectItem>
                    ))}
                </Select>
            </>}
            <Button onClick={handleCreate} className="w-[160px] mx-auto mt-6" color="blue">{activity ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default ActivityForm