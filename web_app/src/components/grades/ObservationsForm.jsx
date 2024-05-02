import { Textarea, Button } from "@tremor/react"
import { useState } from "react"

const ObservationsForm = ({ observations }) => {

    const [obs, setObs] = useState(observations && observations || '')

  return (
    <div className="text-sm grid col-span-3">
        {console.log('observations', observations)}
        <div className="flex justify-center items-center">
            <Textarea className="h-[100px]" placeholder="Agregar Observaciones" value={obs} onValueChange={value => setObs(value)} onDoubleClick={() => alert('clicked')}/>
            <Button color="violet-950" className="ml-6 hover:bg-violet-900">{observations ? 'Guardar Observación' : 'Agregar Observación'}</Button>
        </div>
    </div>
  )
}

export default ObservationsForm