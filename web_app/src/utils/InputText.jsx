import { TextInput, Textarea } from "@tremor/react"

const InputText = ({ value, setter, label, type, error, errorMsg, textArea }) => {
  return (
    <div className="flex flex-col gap-4">
        <p className="text-white text-center font-poppins ml-4 text-lg">{label}</p>
        {textArea 
        ?
        <Textarea 
            placeholder="Escriba aquí ..."
            value={value}
            onValueChange={value => setter(value)}
            className='w-[270px] h-[120px]' 
            type={type}
            error={error}
            errorMessage={errorMsg}
        />
        :
        <TextInput 
            placeholder="Escriba aquí ..."
            value={value}
            onValueChange={value => setter(value)}
            className='w-[270px]' 
            type={type}
            error={error}
            errorMessage={errorMsg}
        />
        }
    </div>
  )
}

export default InputText