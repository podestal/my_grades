import { TextInput } from "@tremor/react"
import ubication from '../../assets/contact-ubication.png'

const ContactSection = () => {

    const handleSubmit = () => {

    }

  return (
    <section id='contact' className='flex md:flex-row flex-col sm:py-16 py-6 relative'>
        <div className='flex-1 flex flex-col justify-start items-start'>
            <h2 className='font-poppins font-semibold xs-text-[48px] text-[40px] text-white xs:leading-[76px] leading-[66px] w-full'>Contáctenos</h2>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Contáctenos al número 973000006</p>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>O envíenos un correo, llenando el siguiente formulario</p>
            <p className='font-poppins font-normal text-gray-400 text-[18px] leading-[30px] mt-4'>Estamos ubicados en Urb Luz y Fuerza D-8 Mollendo-Islay-Arequipa</p>
            <img src={ubication} alt="" className="rounded-[35px] my-8" />
        </div>
        <div className='flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-8 w-[400px]'>
                <TextInput 
                placeholder='Nombre'
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                
                />
                <TextInput 
                placeholder='Apellido'
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                />
               <TextInput 
                placeholder='Correo Electrónico'
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                type="email"
                />
                <TextInput 
                placeholder='Teléfono'
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                type="phone"
                />
                <TextInput 
                placeholder='Ciudad'
                // value={password}
                // onChange={e => setPassword(e.target.value)}
                // error={error}

                />
               <TextInput 
                placeholder='Colegio'
                // value={username}
                // onChange={e => setUsername(e.target.value)}
                // error={error}
                />
                <button className='bg-gradient-to-r from-violet-600 to-indigo-950  border-none py-4 px-8 rounded-3xl text-white font-bold text-xl' type='submit'>Enviar</button>
            </form>
        </div>
        <div className="absolute z-[0] w-[50%] h-[65%] bottom-0 left-0 pink__gradient" />
    </section>
  )
}

export default ContactSection