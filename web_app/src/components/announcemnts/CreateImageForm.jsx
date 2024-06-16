import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@tremor/react'
import CloseButton from '../../utils/CloseButton'
import { createAnnouncementImg } from '../../api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import { Button } from '@tremor/react'
import GenericCallout from '../../utils/GenericCallout'

const CreateImageForm = ({ open, setOpenImgForm, announcement }) => {

    const { user } = useAuth()
    const queryClient = useQueryClient()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    const { mutate: createAnnouncementImgMutation } = useMutation({
        mutationFn: data => createAnnouncementImg(data),
        onSuccess: res => {
            setSuccess(true)
            setError(false)
            setDisable(true)
            queryClient.invalidateQueries(['announcements'])
        },
        onError: err => {
            setSuccess(false)
            setError(true)
            setDisable(false)
            console.log(err)
        }
    })    

    const handleClosePanel = () => {
        setOpenImgForm(false)
        setSuccess(false)
        setError(false)
        setDisable(false)
    }

    const [announcementImg, setAnnouncementImg] = useState("")
    const [announcementImgError, setAnnouncementImgError] = useState(false)

    const handleCreate = () => {
        setAnnouncementImgError(false)
        if (announcementImg.length == 0) {
            setAnnouncementImgError(true)
            return
        }
        const formData = new FormData()
        formData.append('image', announcementImg)
        createAnnouncementImgMutation({ token: user.access, announcementId: announcement.id, announcementImg: {image: announcementImg}})
    }

  return (
    <Dialog
        open={open}
        onClose={handleClosePanel}
    >
        <DialogPanel className="flex flex-col gap-6 w-full m-auto justify-center items-center">
            <CloseButton handleClose={handleClosePanel}/>
            {error && <GenericCallout conditionalMsg={'No se pudo adjuntar la imagen'} title={'Error'} color={'red'}/>}
            {success && <GenericCallout conditionalMsg={'Imagen adjuntada'} title={'Nueva Imagen'} color={'teal'}/>}
            <p className="text-white font-montserrat text-center text-2xl">Subir imagen</p>
            {announcementImgError && <p className='tet-xl text-red-500'>Tiene que seleccionar una imagen para adjuntar</p>}
            <input 
                type='file'
                onChange={e => {
                    setError(false)
                    setSuccess(false)
                    setDisable(false)
                    setAnnouncementImgError(false)
                    setAnnouncementImg(e.target.files[0])}}
                id="files"
                className='input-file'
            />
            <Button disabled={disable} onClick={handleCreate} className='px-8' size='xl' color='blue'>Adjuntar</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default CreateImageForm