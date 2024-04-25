import { useState } from "react"

const FAQCard = ({ faq }) => {

    const [show, setShow] = useState(true)

  return (
    <div className='bg-slate-900 p-6 my-12 rounded-[35px] shadow-violet-950 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]'>
        <h2 
            className="text-3xl my-4 "
            onClick={() => setShow(prev => !prev)}
        >{faq.question}</h2>
        {show && <p>{faq.answer}</p>}
    </div>
  )
}

export default FAQCard

