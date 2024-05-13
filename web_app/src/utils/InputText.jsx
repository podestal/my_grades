import { TextInput, Textarea } from "@tremor/react"

const InputText = ({ value, setter, label, type, error, errorMsg, textArea, icon, placeholder }) => {
  return (
    <div className="flex flex-col gap-4">
        <p className="text-white text-center font-poppins ml-4 text-lg">{label}</p>
        {textArea 
        ?
        <Textarea 
        placeholder={placeholder ? placeholder : "Escriba aquí ..."}
            value={value}
            onValueChange={value => setter(value)}
            className='w-[270px] h-[120px]' 
            type={type}
            error={error}
            errorMessage={errorMsg}
        />
        :
        <TextInput 
            placeholder={placeholder ? placeholder : "Escriba aquí ..."}
            value={value}
            onValueChange={value => setter(value)}
            className='w-[270px]' 
            type={type}
            error={error}
            errorMessage={errorMsg}
            icon={icon}
        />
        }
    </div>
  )
}

export default InputText