import { faqs } from "../../constants"
import FAQCard from "./FAQCard"

const FAQ = () => {
  return (
    <section id="faq">
        <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Preguntas Frecuentes</h2>
        {faqs.map( faq => (
            <FAQCard 
                key={faq.question}
                faq={faq}
            />
        ))}
    </section>
  )
}

export default FAQ