import { DialogPanel, Select, SelectItem, Button } from "@tremor/react"

const UpdateGradeModal = ({ activity, student, setOpen, calification }) => {
  return (
    <DialogPanel className="relative flex flex-col gap-4">
        <h2 className="text-white text-3xl text-center">{activity}</h2>
        <h3 className="text-white text-xl text-center">{student}</h3>
        <button onClick={() => setOpen(false)} className="absolute top-0 right-2 text-4xl text-red-500 hover:text-red-400">x</button>
        <Select defaultValue={calification}>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="AD">AD</SelectItem>
        </Select>
        <div className="flex items-center justify-center my-4">
            <Button className="" variant="secondary">Cambiar</Button>
        </div>
    </DialogPanel>
  )
}

export default UpdateGradeModal