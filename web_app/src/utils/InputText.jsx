import { TextInput } from "@tremor/react"

const InputText = ({ value, setter, label, type, error, errorMsg }) => {
  return (
    <div className="flex flex-col gap-4">
        <p className="text-white text-center font-poppins ml-4 text-lg">{label}</p>
        <TextInput 
            placeholder="Escribe aquí"
            value={value}
            onValueChange={value => setter(value)}
            className='w-[270px]' 
            type={type}
            error={error}
            errorMessage={errorMsg}
        />
    </div>
  )
}

export default InputText