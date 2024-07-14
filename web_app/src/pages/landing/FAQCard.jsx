import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

const FAQCard = ({ faq }) => {

    const [show, setShow] = useState(false)

  return (
    <div className='w-full'>
        <AnimatePresence>
          <div 
            onClick={() => setShow(prev => !prev)}
            className="bg-slate-900 p-6 my-12 cursor-pointer rounded-[35px] shadow-violet-950 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <h2 
                className="text-3xl my-4 "
                >{faq.question}
            </h2>
          </div>
          {show && 
            <motion.p
              initial={{opacity: 0, translateY: 50}}
              whileInView={{opacity: 1, translateY: 0}}
              transition={{duration: 0.8}}
              className="px-6 text-xl"
              >{faq.answer}</motion.p>
          }
        </AnimatePresence>

    </div>
  )
}

export default FAQCard

