import { Dialog, DialogPanel } from "@tremor/react"
import CloseButton from "../../utils/CloseButton"
import ParticipationsSummary from "./ParticipationsSummary"
import { Divider, Button } from "@tremor/react"
import { useState } from "react"
import ParticipationForm from "./ParticipationForm"
import CreateParticipation from "./CreateParticipation"
import GenericCallout from "../../utils/GenericCallout"

const StudentParticipationsModal = ({student, open, setOpen, setIsParticipation, quarter, selectedCompetency, selectedCapacity, assignature }) => {

    const [openCreate, setOpenCreate] = useState(false)
    const participations = student && student.participations.filter( participation => (
        participation.quarter == quarter &&
        participation.assignature == assignature.id &&
        participation.competences.split(',').indexOf(selectedCompetency.toString()) >= 0 &&
        participation.capacities.split(',').indexOf(selectedCapacity.toString()) >= 0
    ))


    const handleClosePanel = () => {
        setOpen(false)
        setIsParticipation(false)
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            <CloseButton handleClose={handleClosePanel}/>

            <h2 className="text-white text-4xl text-center font-poppins">Participaciones</h2>
            <>
                {!openCreate 
                ? 
                <Button onClick={() => setOpenCreate(true)} className="w-[160px] mx-auto mt-6" color="blue">Nueva Participación</Button> 
                : 
                <Button onClick={() => setOpenCreate(false)} className="w-[160px] mx-auto mt-6" color="blue">Volver</Button>
                }
            </>
            <Divider></Divider>
            <h3 className="text-white text-3xl text-center font-poppins mb-6">{student.first_name} {student.last_name}</h3>
            {!openCreate &&<GenericCallout conditionalMsg={'Para editar, haga click en la nota de la participación'} color={'teal'}/>}
            <>
            {openCreate 
                ? 
                <CreateParticipation 
                    student={student}
                    assignature={assignature}
                    quarter={quarter}
                />
                :
                <>

                {participations.length == 0
                ? 
                <h2 className="text-2xl text-center">No se encotraron participaciones</h2> 
                : 
                <ParticipationsSummary 
                    participations={participations}
                />
                }
                </>

            }
            </>
        </DialogPanel>
    </Dialog>
  )
}

export default StudentParticipationsModal