import { Button, Dialog, DialogPanel, TextInput, DatePicker, Select, SelectItem, Textarea, Callout } from "@tremor/react"
import { useState } from "react"
import { es } from 'date-fns/locale'
import { competenciesData } from "../../../data/competencies"
import { capacitiesData } from "../../../data/capacities"
import { createActivity, updateActivity, getCategories } from "../../../api/api"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import useCategories from "../../../hooks/useCategories"
import useAuth from "../../../hooks/useAuth"
import moment from 'moment'
import GetCategories from "../../getters/GetCategories"

const CreateActivity = ({ assignature, activity }) => {

    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const queryClient = useQueryClient()

    // Cats
    const { categories, setCategories } = useCategories()

    // Input data
    const [title, setTitle] = useState(activity && activity.title || '')
    const [description, setDescription] = useState(activity && activity.description || '')
    const [date, setDate] = useState(activity && new Date(activity.due_date) || new Date())
    const [selectedCategory, setSelectedCategory] = useState(activity && activity.category || '')
    // const categoryTitle = categories && getCategoryById(categories, selectedCategory)
    const [selectedQuarter, setSelectedQuarter] = useState('Q2')
    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [selectedCompetency, setSelectedCompetency] = useState(activity && activity.competence || '')
    const capacities = selectedCompetency && capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const [selectedCapacity, setSelectedCapacity] = useState(activity && activity.capacity || '')
    

    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // Mutation Create
    const { mutate: createActivityMutation } = useMutation({
        mutationFn: data => createActivity(data),
        onSuccess: res => {
            queryClient.invalidateQueries(['activities'])
            setSuccess('Actividad Creada')
            setError('')
        },
        onError: err => {
            setError('No se pudo crear actividad, inténtelo otra vez')
            setSuccess('')
        }
    })

    // Mutation Update
    const { mutate: updateActivityMutation } = useMutation({
        mutationFn: data => updateActivity(data),
        onSuccess: res => {
            console.log('Activity update response',res.data)
            queryClient.invalidateQueries(['activities'])
            setSuccess('Actividad editada')
            setError('')
        },
        onError: err => {
            setError('No se pudo editar actividad, inténtelo otra vez')
            setSuccess('')
        }
    })

    const handleCreate = () => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        if (activity) {
            updateActivityMutation({
                token: user.access,
                activityId: activity.id,
                updates: {
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
        } else {
            createActivityMutation({
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

    }

  return (
    <div>
        {categories.length == 0 
        ?
        <GetCategories 
            setCategories={setCategories}
        />
        :
        <>
        <div className='flex items-start justify-center'>
            <Button 
                onClick={() => {
                    setSuccess('')
                    setError('')
                    setOpen(true)}} 
                color='violet-950' 
                className="hover:bg-violet-900"
                size="xl"
                >{activity ? 'Editar Actividad' : 'Nueva Actividad'}
            </Button>
        </div>
        <Dialog 
            open={open}
            onClose={() => setOpen(false)}
            static={true}
        >
            <DialogPanel className="relative flex flex-col gap-4">
                {error &&         
                    <Callout title="Error" color='red'>
                        {error}
                    </Callout>
                }
                {success &&         
                    <Callout title="Categoría Creada" color='teal'>
                        {success}
                    </Callout>
                }
                <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
                <h2 className="text-white text-3xl text-center">{activity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
                <p className="text-white font-poppins">Título</p>
                <TextInput placeholder="Título" value={title} onValueChange={value => setTitle(value)}/>
                <p className="text-white font-poppins">Descripción</p>
                <Textarea placeholder="Descripción" value={description} onValueChange={value => setDescription(value)}/>
                <p className="text-white font-poppins">Adjuntar</p>
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
                <Button onClick={handleCreate} className="w-[200px] mx-auto" color="blue">{activity ? 'Guardar' : 'Crear'}</Button>
            </DialogPanel>
        </Dialog>
        </>
        }
    </div>
  )
}

export default CreateActivity