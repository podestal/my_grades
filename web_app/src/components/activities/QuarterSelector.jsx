import { Select, SelectItem } from "@tremor/react"
const QuarterSelector = ({quarter, setQuarter}) => {

  return (
    <div className='flex flex-col'>
        <p className="mb-8 font-poppins text-md">Seleccione bimestre</p>
        <Select value={quarter} onValueChange={ value => setQuarter(value)}>
            <SelectItem value="Q1">B1</SelectItem>
            <SelectItem value="Q2">B2</SelectItem>
            <SelectItem value="Q3">B3</SelectItem>
            <SelectItem value="Q4">B4</SelectItem>
        </Select>
    </div>
  )
}

export default QuarterSelector