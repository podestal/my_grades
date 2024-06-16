import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@tremor/react'
import CloseButton from '../../utils/CloseButton'
import { createAnnouncementImg } from '../../api/api'
import { useMutation } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import { Button } from '@tremor/react'

const CreateImageForm = ({ open, setOpenImgForm, announcement }) => {

    const { user } = useAuth()
    const { mutate: createAnnouncementImgMutation } = useMutation({
        mutationFn: data => createAnnouncementImg(data),
        onSuccess: res => console.log(res),
        onError: err => console.log(err)
    })    

    const [announcementImg, setAnnouncementImg] = useState("")

    const handleCreate = () => {
        const formData = new FormData()
        formData.append('image', announcementImg)
        // createOrderReceiptMutation({ access: user.accessToken, orderId:order.id, image:formData })
        createAnnouncementImgMutation({ token: user.access, announcementId: announcement.id, announcementImg: {image: announcementImg}})
    }

  return (
    <Dialog
        open={open}
        onClose={() => setOpenImgForm(false)}
    >
        <DialogPanel className="flex flex-col gap-6 w-full m-auto justify-center items-center">
            <CloseButton handleClose={() => setOpenImgForm(false)}/>
            <p className="text-white font-montserrat text-center text-2xl">Subir imagen</p>
            <input 
                type='file'
                onChange={e => setAnnouncementImg(e.target.files)}
                id="files"
                className='input-file'
            />
            <Button onClick={handleCreate} className='px-8' size='xl' color='blue'>Adjuntar</Button>
        </DialogPanel>
    </Dialog>
  )
}

export default CreateImageForm