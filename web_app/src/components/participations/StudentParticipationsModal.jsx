import { Dialog, DialogPanel } from "@tremor/react"
import CloseButton from "../../utils/CloseButton"
import ParticipationsSummary from "./ParticipationsSummary"
import { Divider } from "@tremor/react"

const StudentParticipationsModal = ({student, open, setOpen}) => {

    const handleClosePanel = () => {
        setOpen(false)
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel className="relative flex flex-col gap-4 items-center">
            <CloseButton handleClose={handleClosePanel}/>
            <h2 className="text-white text-4xl text-center font-poppins">Participaciones</h2>
            <Divider></Divider>
            <h3 className="text-white text-3xl text-center font-poppins mb-6">{student.first_name} {student.last_name}</h3>
            {student.participations.length == 0
            ? 
            <h2 className="text-2xl text-center">No se encotraron participaciones</h2> 
            : 
            <ParticipationsSummary participations={student.participations}/>
            }
        </DialogPanel>
    </Dialog>
  )
}

export default StudentParticipationsModal