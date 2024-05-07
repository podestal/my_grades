import { Button, Dialog, DialogPanel } from "@tremor/react"
import { useState } from "react"
import AnnouncementsForm from "./AnnouncementsForm"

const CreateAnnouncements = ({ announcement }) => {

    const [open, setOpen] = useState(false)

  return (
    <div>
        <Button
            color='violet-950' 
            onClick={() => setOpen(true)}
        >Nuevo Anuncio</Button>
        <AnnouncementsForm 
            open={open}
            setOpen={setOpen}
        />
    </div>
  )
}

export default CreateAnnouncements