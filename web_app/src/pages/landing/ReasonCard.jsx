import { RiLockFill } from "@remixicon/react"
import { Icon } from "@tremor/react"

const ReasonCard = ({ reason }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <Icon color="violet" icon={reason.icon} size="xl"/>
        <h3 className="font-bold text-xl text-center my-6 font-poppins">{reason.title}</h3>
        <p className="font-poppins font-normal text-center text-gray-400 text-[18px] leading-[30px] mt-4">{reason.description}</p>
    </div>
  )
}

export default ReasonCard