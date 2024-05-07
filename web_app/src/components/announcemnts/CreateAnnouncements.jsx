import { Button, Dialog, DialogPanel } from "@tremor/react"
import { useState } from "react"
import AnnouncementsForm from "./AnnouncementsForm"
import { useMutation } from "@tanstack/react-query"
import { createAnnouncement } from "../../api/api"
import useAnnouncements from "../../hooks/useAnnouncements"

const CreateAnnouncements = () => {

    const [open, setOpen] = useState(false)

    const { setAnnouncements } = useAnnouncements()

    const { mutate: createAnnouncementMutation } = useMutation({
        mutationFn: data => createAnnouncement(data),
        onSuccess: res => {
            setAnnouncements( prev => [...prev, res.data])
        },
        onError: err => console.log(err),
    })

  return (
    <div>
        <Button
            color='violet-950' 
            onClick={() => setOpen(true)}
        >Nuevo Anuncio</Button>
        <AnnouncementsForm 
            open={open}
            setOpen={setOpen}
            create={createAnnouncementMutation}
        />
    </div>
  )
}

export default CreateAnnouncements