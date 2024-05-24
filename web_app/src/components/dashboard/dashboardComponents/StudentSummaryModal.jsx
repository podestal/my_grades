import { Dialog, DialogPanel } from "@tremor/react"
import CloseButton from "../../../utils/CloseButton"

const StudentSummaryModal = ({ open, setOpen, setStudentSummary, student }) => {

    const handleClosePanel = () => {
        setOpen(false)
        setStudentSummary(false)
    }

  return (
    // <DialogPanel

    // >
    //     <Dialog>
    //         <CloseButton handleClose={handleClosePanel}/>
    //     </Dialog>   
    // </DialogPanel>
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel>
            <CloseButton handleClose={handleClosePanel}/>
        </DialogPanel>
    </Dialog>
  )
}

export default StudentSummaryModal