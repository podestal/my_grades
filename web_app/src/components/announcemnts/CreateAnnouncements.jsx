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

    // ERROR HANDLING
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [disable, setDisable] = useState(false)

    const { setAnnouncements } = useAnnouncements()

    const { mutate: createAnnouncementMutation } = useMutation({
        mutationFn: data => createAnnouncement(data),
        onSuccess: res => {
            setAnnouncements( prev => [...prev, res.data])
            queryClient.invalidateQueries(['announcements'])
            setError(false)
            setSuccess(true)
            setDisable(true)
        },
        onError: err => {
            setError(true)
            setSuccess(false)
            setDisable(false)
        },
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
            success={success}
            setSuccess={setSuccess}
            error={error}
            setError={setError}
            disable={disable}
            setDisable={setDisable}
        />
    </div>
  )
}

export default CreateAnnouncements