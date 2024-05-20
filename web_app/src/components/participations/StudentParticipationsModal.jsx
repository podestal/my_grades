import { Dialog, DialogPanel } from "@tremor/react"
import CloseButton from "../../utils/CloseButton"
import ParticipationsSummary from "./ParticipationsSummary"

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
            <h2 className="text-white text-3xl text-center">Participaciones</h2>
            <h3 className="text-white text-xl text-center">{student.first_name} {student.last_name}</h3>
            {student.participations.length == 0
            ? 
            <h2 className="text-2xl text-center">No se encotraron participaciones</h2> 
            : 
            <ParticipationsSummary participations={student.participations}/>
            // <>
            //     {student.participations.map( participation => (
            //         <>
            //             <p>{participation.created_at}</p>
            //             <p>{participation.calification}</p>
            //         </>
            //     ))}
            // </>
            }
        </DialogPanel>
    </Dialog>
  )
}

export default StudentParticipationsModal