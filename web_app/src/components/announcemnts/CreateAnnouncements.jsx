import { Button, Dialog, DialogPanel } from "@tremor/react"
import { useState } from "react"
import AnnouncementsForm from "./AnnouncementsForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnnouncement } from "../../api/api"
import useAnnouncements from "../../hooks/useAnnouncements"
import { getClasesIds, getClasesForInstructors } from "../../data/getClasesForInstructors"

const CreateAnnouncements = ({clases, assignatures}) => {

    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const clasesIds = getClasesIds(assignatures)
    const filteredClases = getClasesForInstructors(clases, clasesIds)


    const { setAnnouncements } = useAnnouncements()

    const { mutate: createAnnouncementMutation } = useMutation({
        mutationFn: data => createAnnouncement(data),
        onSuccess: res => {
            setAnnouncements( prev => [...prev, res.data])
            queryClient.invalidateQueries(['announcements'])
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
            clases={filteredClases}
        />
    </div>
  )
}

export default CreateAnnouncements