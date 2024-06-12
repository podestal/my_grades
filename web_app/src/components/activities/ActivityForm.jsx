import { useState } from "react"
import { Button, Dialog, DialogPanel, DatePicker, Textarea } from "@tremor/react"
import { useQueryClient } from "@tanstack/react-query"
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
import getIntegerArray from "../../data/getIntegerArray"
import { getCurrentQuarter } from "../../data/currentQuarter"

const ActivityForm = ({ activity, assignature, open, setOpen, success, setSuccess, setError, error, create, update, disable, setDisable }) => {

    //QUERY CLIENT
    const queryClient = useQueryClient()
    // USER
    const { user } = useAuth()

    // LOCAL CATEGORIES
    const categories = queryClient.getQueryData(['categories'])

    // MODEL FIELDS
    const [title, setTitle] = useState(activity && activity.title || '')
    const [description, setDescription] = useState(activity && activity.description || '')
    const [date, setDate] = useState(activity && new Date(activity.due_date) || new Date())
    const [selectedCategory, setSelectedCategory] = useState(activity && activity.category || '')
    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [selectedCompetency, setSelectedCompetency] = useState(activity && getIntegerArray(activity.competences.split(',')) || [])
    const capacities = selectedCompetency && capacitiesData.filter( capacity => selectedCompetency.indexOf(capacity.competence) >= 0)
    const [selectedCapacity, setSelectedCapacity] = useState(activity && getIntegerArray(activity.capacities.split(',')) || [])
    const currentQuarter = getCurrentQuarter()
    const [selectedQuarter, setSelectedQuarter] = useState(activity && activity.quarter || currentQuarter.id)

    // VALIDATION ERROR HANDLING
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [selectedCategoryError, setSelectedCategoryError] = useState(false)
    const [selectedCompetencyError, setSelectedCompetencyError] = useState(false)
    const [selectedCapacityError, setSelectedCapacityError] = useState(false)

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
        setDisable(false)
    }

    const handleSubmit = () => {

        setTitleError(false)
        setSelectedCompetencyError(false)
        setSelectedCapacityError(false)
        setSelectedCategoryError(false)

        if (title.length == 0) {
            setTitleError(true)
            return
        }

        if (selectedCategory.length == 0) {
            setSelectedCategoryError(true)
            return
        }

        if (selectedCompetency.length == 0) {
            setSelectedCompetencyError(true)
            return
        }

        if (selectedCapacity.length == 0) {
            setSelectedCapacityError(true)
            return
        }
            
        const formattedDate = moment(date).format('YYYY-MM-DD')
        create &&  create({
            token: user.access,
            activity: {
                title,
                description,
                assignature: assignature.id,
                quarter: selectedQuarter,
                due_date: formattedDate,
                competences: selectedCompetency.toString(),
                capacities: selectedCapacity.toString(),
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
                competences: selectedCompetency.toString(),
                capacities: selectedCapacity.toString(),
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
            <Selector 
                label={'Bimestre'} 
                value={selectedQuarter} 
                setter={setSelectedQuarter} 
                items={quartersData}
            />

            {/* Categories Selector */}
            <Selector 
                label={'Categoría'} 
                value={selectedCategory} 
                setter={setSelectedCategory} 
                items={categories} 
                error={selectedCategoryError}
                errorMsg={'Necesita seleccionar una categoría'}
            />
            
            {/* Competences Selector */}
            {/* <Selector label={'Competencia'} value={selectedCompetency} setter={setSelectedCompetency} items={competencies} /> */}
            <MultiSelector 
                label={'Competencia'} 
                value={selectedCompetency} 
                setter={setSelectedCompetency} 
                items={competencies} 
                error={selectedCompetencyError} 
                errorMsg={'Necesita seleccionar al menos una competencia'}
            />
            
            {/* Capacities Selector */}
            {/* {selectedCompetency && <Selector label={'Capacidad'} value={selectedCapacity} setter={setSelectedCapacity} items={capacities} />} */}
            {selectedCompetency && 
            <MultiSelector 
                label={'Capacidad'} 
                value={selectedCapacity} 
                setter={setSelectedCapacity} 
                items={capacities}
                error={selectedCapacityError}
                errorMsg={'Necesita seleccionar al menos una capacidad'}
            />
            }

            <Button disabled={disable} onClick={handleSubmit} className="w-[160px] mx-auto mt-6" color="blue">{activity ? 'Guardar' : 'Crear'}</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default ActivityForm