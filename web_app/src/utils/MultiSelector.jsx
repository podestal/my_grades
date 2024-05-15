import { MultiSelect, MultiSelectItem } from "@tremor/react"

const MultiSelector = ({ label, value, setter, items, everything ,wide }) => {
  return (
    <div className={`flex flex-col gap-4 ${wide ? 'w-[450px]' : 'w-[270px]'}`}>
        {console.log('value multi', value)}
        <p className="text-white font-poppins ml-4 text-lg text-center">{label}</p>
        <MultiSelect 
            value={value} 
            onValueChange={value => setter(value)} 
            placeholder="Seleccione ...">
        {everything && <MultiSelectItem value="all">{everything}</MultiSelectItem>}
            {items.map( item => (
                <MultiSelectItem key={item.id} value={item.id}>
                    {item?.title}
                </MultiSelectItem>
            ))}
        </MultiSelect>
    </div>
  )
}

export default MultiSelector