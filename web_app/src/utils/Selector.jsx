import { Select, SelectItem } from "@tremor/react"

const Selector = ({ label, value, setter, items, everything }) => {
  return (
    <div className="flex flex-col gap-4 w-[270px]">
        <p className="text-white font-poppins ml-4 text-lg text-center">{label}</p>
        <Select value={value} onValueChange={value => setter(value)} placeholder="Seleccione ...">
        {everything && <SelectItem value="all">{everything}</SelectItem>}
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