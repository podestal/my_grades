import { useState } from "react"
import { API_URL } from "../../api/api"
import AnnouncementsForm from "./AnnouncementsForm"
import { updateAnnouncementMutation } from "../../tanstack/Announcements"
import AnnouncementImgs from "./AnnouncementImgs"
import { Accordion, AccordionList, AccordionHeader, AccordionBody } from "@tremor/react"

const Announcement = ({ announcement, clases }) => {

    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    const { mutate } = updateAnnouncementMutation({ setSuccess, setError, setDisable })

  return (
    <div className='flex flex-col' >
        {/* open, setOpen, announcement, create, clases, success, setSuccess, error, setError, disable, setDisable */}
        <div className='p-4 flex flex-col gap-6 cursor-pointer hover:bg-slate-900' onClick={() => setOpen(true)}>
            <div className="flex w-full justify-between">
                <h2 className='text-4xl font-montserrat font-bold'>{announcement.title}</h2>
                <p className="text-2xl font-montserrat font-bold">{announcement.clase.title}-{announcement.clase.level}</p>
            </div>
            <p className='text-xl text-slate-400 font-poppins'>{announcement.description}</p>
        </div>
       {/* {announcement.annunciation_imgs.length > 0 && 
       <AccordionList className="my-0">
            <Accordion className="border-none bg-primary">
                <AccordionHeader className="bg-primary font-bold flex justify-center">
                    <p className='ml-10 text-2xl font-montserrat my-4'>Imágenes</p>
                </AccordionHeader>
                <AccordionBody className="bg-primary font-bold">
                    <AnnouncementImgs 
                        images={announcement.annunciation_imgs}
                    />
                </AccordionBody>
            </Accordion>
        </AccordionList>} */}
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