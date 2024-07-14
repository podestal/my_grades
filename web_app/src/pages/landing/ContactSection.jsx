import { TextInput, Textarea, Callout } from "@tremor/react"
import ubication from '../../assets/contact-ubication.png'
import emailjs from '@emailjs/browser'
import { useRef, useState } from "react"

const ContactSection = () => {

    const form = useRef(null)
    const name = useRef(null)
    const email = useRef(null)
    const phone = useRef(null)
    const city = useRef(null)
    const school = useRef(null)
    const [message, setMessage] = useState('')

    // ERROR HANDLING
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmaiError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [schoolError, setSchoolError] = useState(false)
    const [messageError, setMessageError] = useState(false)

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        setNameError(false)
        setEmaiError(false)
        setPhoneError(false)
        setCityError(false)
        setSchoolError(false)
        setMessageError(false)

        setSuccess(false)
        setError(false)

        if (form.current === null) {
            return
        }
    
        if (name.current?.value.length === 0) {
            setNameError(true)
            return
        }
    
        if (email.current?.value.length === 0) {
            setEmaiError(true)
            return
        }
    
        if (phone.current?.value.length === 0) {
            setPhoneError(true)
            return
        }
    
        if (city.current?.value.length === 0) {
            setCityError(true)
            return
        }
    
        if (school.current?.value.length === 0) {
            setSchoolError(true)
        }
    
        if (message.length === 0) {
            setMessageError(true)
        }

        emailjs.sendForm('service_uoi14fu', 'template_qzfjt0u', form.current, {
            publicKey: 'JWOBBVI0xbGxiZOd0'
        })
        .then( res => {
            form.current?.reset()
            setMessage('')
            setSuccess(true)
            setError(false)
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        })
        .catch( err => {
            setSuccess(false)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

  return (
    <section id='contact' className='flex md:flex-row flex-col sm:py-16 py-6 relative z-10'>
        <div className='flex-1 flex flex-col justify-start items-start max-lg:items-center max-lg:text-center'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Contáctenos</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Contáctenos al número 973000006</p>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>O envíenos un correo, llenando el siguiente formulario</p>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Estamos ubicados en Urb Luz y Fuerza D-8 Mollendo-Islay-Arequipa</p>
            <img src={ubication} alt="" className="rounded-[35px] my-8" />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center gap-6 md:ml-10 ml-0 md:mt-0 mt-10'>
            {success && <Callout title="Su mensaje ha sido enviado" color='teal'/>}
            {error && <Callout title="Ocurrió un error" color='red'/>}
            <form ref={form} onSubmit={e => handleSubmit(e)} className='flex flex-col justify-center items-center gap-8 w-[400px]'>
                <TextInput 
                placeholder='Nombre y Apellido'
                ref={name}
                name="from_name"
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                error={nameError}
                errorMessage="Su nombre es necesario"
                />
               <TextInput 
                placeholder='Correo Electrónico'
                ref={email}
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                type="email"
                name="from_email"
                error={emailError}
                errorMessage="Su correo electrónico es necesario"
                />
                <TextInput 
                placeholder='Teléfono'
                ref={phone}
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                type="phone"
                name="from_phone"
                error={phoneError}
                errorMessage="Su telélofono es necesario"
                />
                <TextInput 
                placeholder='Ciudad'
                ref={city}
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                // error={error}
                name="from_city"
                error={cityError}
                errorMessage="Su ciudad es necesaria"
                />
               <TextInput 
                placeholder='Colegio'
                ref={school}
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                name="from_school"
                error={schoolError}
                errorMessage="Su colegio es necesario"
                />
                <Textarea 
                placeholder="Mensaje"
                name="message"
                value={message}
                onValueChange={value => setMessage(value)}
                error={messageError}
                errorMessage="Su mensaje es necesario"
                />
                <button disabled={disable} className='bg-gradient-to-r from-violet-600 to-indigo-950  border-none py-4 px-8 rounded-3xl text-white font-bold text-xl' type='submit'>Enviar</button>
            </form>
        </div>
        <div className="absolute z-[0] w-[50%] h-[65%] bottom-0 left-0 pink__gradient" />
    </section>
  )
}

export default ContactSection