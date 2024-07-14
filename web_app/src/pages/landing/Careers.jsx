import { useEffect } from "react"

const Careers = () => {

    useEffect(() => {
        window.scroll(0, 0)
    })

  return (
    <div className="min-h-screen text-slate-50 lg:max-w-[1280px] text-lg mx-auto flex flex-col gap-6 font-palanquin">
        <h2 className="text-4xl">¡Bienvenido a la sección de carreras de Edumétrica!</h2>
        <p>Actualmente, no estamos contratando, pero en el futuro es posible que tengamos oportunidades disponibles. Edumétrica es una plataforma innovadora dedicada al seguimiento del progreso académico de los estudiantes, facilitando la comunicación entre padres y maestros, y mejorando la experiencia educativa a través de la tecnología.</p>
        <h3 className="text-3xl">¿Por Qué Trabajar en Edumétrica?</h3>
        <ul>
            <li><span className="font-bold">Innovación</span>: Formarás parte de un equipo que utiliza tecnología de vanguardia para transformar la educación.</li>
            <li><span className="font-bold">Impacto</span>: Contribuirás al desarrollo académico de miles de estudiantes y a mejorar la comunicación entre padres y maestros.</li>
            <li><span className="font-bold">Crecimiento Profesional</span>: Ofrecemos oportunidades de desarrollo y crecimiento profesional en un entorno dinámico y colaborativo.</li>
            <li><span className="font-bold">Cultura de Trabajo</span>: Fomentamos un ambiente de trabajo inclusivo, respetuoso y colaborativo donde cada voz es escuchada.</li>
        </ul>
        <h3 className="text-3xl">Áreas de Oportunidad</h3>
        <ul>
            <li>Desarrollo de Software: Ingenieros de software, desarrolladores front-end y back-end.</li>
            <li>Gestión de Producto: Product managers y diseñadores de experiencia de usuario (UX/UI).</li>
            <li>Marketing y Ventas: Especialistas en marketing digital, ventas y relaciones públicas.</li>
            <li>Soporte Técnico: Soporte al cliente y técnicos en sistemas.</li>
        </ul>
        <h3 className="text-3xl">Mantente en Contacto</h3>
        <p>Si estás interesado en formar parte de Edumétrica en el futuro, te invitamos a seguirnos en nuestras redes sociales y a visitar regularmente nuestra página de carreras para estar al tanto de las próximas oportunidades laborales.</p>
    </div>
  )
}

export default Careers