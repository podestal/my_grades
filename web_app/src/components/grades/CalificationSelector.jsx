import { SearchSelect, SearchSelectItem } from "@tremor/react"

const CalificationSelector = ({ calification, setCalification }) => {
  return (
    <SearchSelect className="w-[70px] mx-4" value={calification} onValueChange={ value => setCalification(value)}>
        {console.log('calification from selector', calification)}
        <SearchSelectItem value="AD">AD</SearchSelectItem>
        <SearchSelectItem value="A">A</SearchSelectItem>
        <SearchSelectItem value="B">B</SearchSelectItem>
        <SearchSelectItem value="C">C</SearchSelectItem>
    </SearchSelect>
  )
}

export default CalificationSelector