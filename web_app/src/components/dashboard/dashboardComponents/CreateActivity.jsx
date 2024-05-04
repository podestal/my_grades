import { Button, Dialog, DialogPanel, TextInput, DatePicker, Select, SelectItem, Textarea, Callout } from "@tremor/react"
import { useState } from "react"
import { es } from 'date-fns/locale'
import { competenciesData } from "../../../data/competencies"
import { capacitiesData } from "../../../data/capacities"
import { createActivity } from "../../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import moment from 'moment'

const CreateActivity = ({ assignature, activity }) => {

    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const queryClient = useQueryClient()

    // Input data
    const [title, setTitle] = useState(activity && activity.title || '')
    const [description, setDescription] = useState(activity && activity.description || '')
    const [date, setDate] = useState(activity && new Date(activity.due_date) || new Date())
    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [selectedCompetency, setSelectedCompetency] = useState(activity && activity.competence || '')
    const capacities = selectedCompetency && capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const [selectedCapacity, setSelectedCapacity] = useState(activity && activity.capacity || '')

    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // Mutation
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

    const handleCreate = () => {
        const formattedDate = moment(date).format('YYYY-MM-DD')



        createActivityMutation({
            token: user.access,
            activity: {
                title,
                description,
                assignature: assignature.id,
                due_date: formattedDate,
                competence: selectedCompetency,
                capacity: selectedCapacity,
            }
        })
    }

  return (
    <div>
        <div className='flex items-start justify-center'>
            <Button onClick={() => setOpen(true)} color='violet-950' className="hover:bg-violet-900">Nueva Actividad</Button>
        </div>
        {console.log(competencies)}
        {console.log(selectedCompetency)}
        {console.log('assignature',assignature)}
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
                <h2 className="text-white text-3xl text-center">Nueva Actividad</h2>
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
                <p>Assignature (automatic)</p>
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
                <Button onClick={handleCreate} className="w-[200px] mx-auto" color="blue">Crear</Button>
            </DialogPanel>
        </Dialog>
    </div>
  )
}

export default CreateActivity