import { useState } from "react"
import { API_URL } from "../../api/api"
import AnnouncementsForm from "./AnnouncementsForm"
import { updateAnnouncementMutation } from "../../tanstack/Announcements"

const Announcement = ({ announcement, clases }) => {

    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    const { mutate } = updateAnnouncementMutation({ setSuccess, setError, setDisable })

  return (
    <div className='flex flex-col gap-2 cursor-pointer hover:bg-slate-950' onClick={() => setOpen(true)}>
        {/* open, setOpen, announcement, create, clases, success, setSuccess, error, setError, disable, setDisable */}
        <h2 className='text-4xl font-montserrat font-bold'>{announcement.title}</h2>
        <p className='text-xl text-slate-400 font-poppins'>{announcement.description}</p>
        <p>{announcement.annunciation_imgs.length}</p>
        {console.log(announcement.annunciation_imgs[0]?.image)}
        {announcement.annunciation_imgs.length > 0 && <img width={100} height={100} src={`${API_URL}${announcement.annunciation_imgs[0]?.image}`}/>}
        <AnnouncementsForm 
         open={open}
         setOpen={setOpen}
         announcement={announcement}
         clases={clases}
         update={mutate}
         success={success}
         error={error}
         disable={disable}
         setSuccess={setSuccess}
         setError={setError}
         setDisable={setDisable}
        />
    </div>
  )
}

export default Announcement