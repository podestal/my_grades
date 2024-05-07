import { TextInput } from "@tremor/react"

const InputText = ({ value, setter, label }) => {
  return (
    <div className="flex flex-col gap-4">
        <p className="text-white font-poppins ml-4 text-lg">{label}</p>
        <TextInput 
            placeholder="Escribe aquí"
            value={value}
            onValueChange={value => setter(value)}
        />
    </div>
  )
}

export default InputText