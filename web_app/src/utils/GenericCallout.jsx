import { Callout } from "@tremor/react"

const GenericCallout = ({ conditionalMsg, title, color }) => {
  return (
    <>
        {conditionalMsg &&         
            <Callout title={title} color={color}>
                {conditionalMsg}
            </Callout>
        }
    </>
  )
}

export default GenericCallout