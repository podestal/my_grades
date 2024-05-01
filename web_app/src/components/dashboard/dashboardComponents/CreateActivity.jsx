import { Button, Dialog, DialogPanel, TextInput, DatePicker, Select, SelectItem, Textarea } from "@tremor/react"
import { useState } from "react"
import { es } from 'date-fns/locale'
import { competenciesData } from "../../../data/competencies"
import { capacitiesData } from "../../../data/capacities"
import { createActivity } from "../../../api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import moment from 'moment'

const CreateActivity = ({ assignature }) => {

    const [open, setOpen] = useState(false)
    const { user } = useAuth()

    // Input data
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())
    const competencies = competenciesData.filter( competency => competency.area == assignature.area)
    const [selectedCompetency, setSelectedCompetency] = useState('')
    const capacities = selectedCompetency && capacitiesData.filter( capacity => capacity.competence == selectedCompetency)
    const [selectedCapacity, setSelectedCapacity] = useState('')

    // Mutation
    const { mutate: createActivityMutation } = useMutation({
        mutationFn: data => createActivity(data),
        onSuccess: res => console.log(res.data),
        onError: err => console.log(err)
    })

    const handleCreate = () => {
        console.log('date',moment(date).format('YYYY-MM-DD'))
        const formattedDate = moment(date).format('YYYY-MM-DD')
        // moment(date)
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
        {console.log('capacities',capacities)}
        <div className='flex items-start justify-center'>
            <Button onClick={() => setOpen(true)} color='blue'>Nueva Actividad</Button>
        </div>
        <Dialog 
            open={open}
            onClose={() => setOpen(false)}
            static={true}
        >
            <DialogPanel className="relative flex flex-col gap-4">
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