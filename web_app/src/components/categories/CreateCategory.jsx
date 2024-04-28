import { DialogPanel, TextInput, Button } from "@tremor/react"

const CreateCategory = ({ setOpen }) => {

    const handleCreate = () => {

    }

  return (
    <DialogPanel className='relative flex flex-col items-center gap-4'>
        <h2 className="text-white text-3xl text-center mb-6">Nueva Categoría</h2>
        <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
        <TextInput placeholder='Título ...' className='w-[270px]'/>
        <TextInput type='number' placeholder='Porcentaje...' className='w-[270px]'/>
        <Button onClick={handleCreate}>Crear</Button>
    </DialogPanel>
  )
}

export default CreateCategory