import { name } from "../../constants"
import ReasonCard from "./ReasonCard"
import { reasons } from "../../constants"

const Why = () => {
  return (
    <section id="faq" className="my-10">
        <h2 className='text-center font-poppins font-semibold  xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Por qué {name}?</h2>
        <div className="flex lg:flex-row flex-col gap-12 my-12">
            {reasons.map( reason => (
                <ReasonCard 
                    key={reason.title}
                    reason={reason}
                />
            ))}
        </div>
    </section>
  )
}

export default Why