import Selector from "../../../utils/Selector"
import { quartersData } from "../../../data/quarters"

const QuarterFilter = ({ quarter, setQuarter }) => {
  return (
    <Selector 
        label={'Bimestre'}
        value={quarter}
        setter={setQuarter}
        items={quartersData}
    />
  )
}

export default QuarterFilter