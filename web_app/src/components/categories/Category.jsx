import { Button, Dialog } from "@tremor/react"
import { useState } from "react"
import CreateCategory from "./CreateCategory"

const Category = ({ category }) => {

    const [open, setOpen] = useState(false)

  return (
    <>
        <div className="flex w-[520px]">
            <Button color="red" className="mr-4">Borrar</Button>
            <Button onClick={() => setOpen(true)} color='blue' className="mr-4">Editar</Button>
            <div className='w-full flex justify-between items-center'>
                <p className='text-white font-poppins text-xl'>{category.title}</p>
                <p className='text-white font-poppins'>{category.weight ? `${category.weight * 100}%` : '-'}</p>
            </div>
        </div>
        {open && 
            <Dialog open={open} onClose={() => setOpen(false)}>
                <CreateCategory 
                    setOpen={setOpen}
                    category={category}
                />
            </Dialog>
        }
    </>
  )
}

export default Category