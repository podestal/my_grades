import { Button, Dialog, DialogPanel } from "@tremor/react"
import { useState } from "react"

const CreateActivity = () => {

    const [open, setOpen] = useState(false)

  return (
    <div>
        <div className='flex items-start justify-center'>
            <Button onClick={() => setOpen(true)} color='blue'>Nueva Actividad</Button>
        </div>
        <Dialog 
            open={open}
            onClose={() => setOpen(false)}
            static={true}
        >
            <DialogPanel className="relative flex flex-col gap-4">
                <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
                <h2 className="text-white text-3xl text-center">Nueva Actividad</h2>
            </DialogPanel>
        </Dialog>
    </div>
  )
}

export default CreateActivity