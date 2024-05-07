import { Select, SelectItem } from "@tremor/react"

const Selector = ({ label, value, setter, items }) => {
  return (
    <div className="flex flex-col gap-4">
        <p className="text-white font-poppins ml-4 text-lg">{label}</p>
        <Select value={value} onValueChange={value => setter(value)}>
            {items.map( item => (
                <SelectItem key={item.id} value={item.id}>
                    {item?.title}
                </SelectItem>
            ))}
        </Select>
    </div>
  )
}

export default Selector