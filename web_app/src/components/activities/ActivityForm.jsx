import { useState } from "react"
import { Button, Dialog, DialogPanel, DatePicker, Textarea } from "@tremor/react"
import { es } from 'date-fns/locale'
import moment from "moment"
import useCategories from "../../hooks/useCategories"
import { competenciesData } from "../../data/competencies"
import { capacitiesData } from "../../data/capacities"
import useAuth from "../../hooks/useAuth"
import InputText from "../../utils/InputText"
import GenericCallout from "../../utils/GenericCallout"
import CloseButton from "../../utils/CloseButton"
import Selector from "../../utils/Selector"
import MultiSelector from "../../utils/MultiSelector"
import { quartersData } from "../../data/quarters"

const ActivityForm = ({ activity, assignature, open, setOpen, success, setSuccess, setError, error, create, update }) => {

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
    const [selectedCompetency, setSelectedCompetency] = useState(activity && activity.competence || [])
    const capacities = selectedCompetency && capacitiesData.filter( capacity => selectedCompetency.indexOf(capacity.competence) >= 0)
    const [selectedCapacity, setSelectedCapacity] = useState(activity && activity.capacity || [])
    const [selectedQuarter, setSelectedQuarter] = useState(activity && activity.quarter || 'Q2')

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
            setSelectedCompetency([])
            setSelectedCapacity([])
        } 
        setOpen(false)
        setSuccess('')
        setError('')
    }

    const handleSubmit = () => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        console.log('selectedCompetency', selectedCompetency)
        console.log('selectedCapacity', selectedCapacity)
        create &&  create({
            token: user.access,
            activity: {
                title,
                description,
                assignature: assignature.id,
                quarter: selectedQuarter,
                due_date: formattedDate,
                competences: ('21', '22'),
                capacities: ('80', '79'),
                category: selectedCategory,
            }
        })

        update && update({
            token: user.access,
            activityId: activity.id,
            updates: {
                title,
                description,
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
                textArea={true}
            />
            <p className="text-white font-poppins">Fecha de entrega</p>
            <DatePicker 
                value={date}
                onValueChange={value => setDate(value)}
                locale={es}
                className="w-[270px]"
            />
            {/* Quarter Selector */}
            <Selector label={'Bimestre'} value={selectedQuarter} setter={setSelectedQuarter} items={quartersData}/>

            {/* Categories Selector */}
            <Selector label={'Categoría'} value={selectedCategory} setter={setSelectedCategory} items={categories} />
            
            {/* Competences Selector */}
            {/* <Selector label={'Competencia'} value={selectedCompetency} setter={setSelectedCompetency} items={competencies} /> */}
            <MultiSelector label={'Competencia'} value={selectedCompetency} setter={setSelectedCompetency} items={competencies}/>
            
            {/* Capacities Selector */}
            {/* {selectedCompetency && <Selector label={'Capacidad'} value={selectedCapacity} setter={setSelectedCapacity} items={capacities} />} */}
            {selectedCompetency && <MultiSelector label={'Capacidad'} value={selectedCapacity} setter={setSelectedCapacity} items={capacities}/>}

            <Button onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{activity ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default ActivityForm