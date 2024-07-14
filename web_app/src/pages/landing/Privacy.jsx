import { useEffect } from "react"

const Privacy = () => {

  useEffect(() => {
    window.scroll(0, 0)
  })

  return (
    <div className="min-h-screen text-slate-50 lg:max-w-[1280px] text-lg mx-auto flex flex-col gap-6 font-palanquin pb-10">
        <h2 className="text-4xl">Privacidad en Edumétrica</h2>
        <p>En Edumétrica, la privacidad y seguridad de la información de nuestros usuarios es nuestra máxima prioridad. A continuación, detallamos nuestras prácticas y políticas para proteger y manejar los datos de manera segura.</p>
        <h3 className="text-3xl">Seguridad de la Información</h3>
        <ul>
            <li>Encriptación Avanzada: Utilizamos tecnologías de encriptación avanzadas para proteger todos los datos almacenados y transmitidos a través de nuestra plataforma.</li>
            <li>Acceso Restringido: Solo los usuarios autorizados y autenticados pueden acceder a la información sensible. Implementamos controles de acceso estrictos para asegurar que solo las personas correctas puedan ver y manejar los datos.</li>
            <li>Monitoreo y Auditorías: Realizamos monitoreos continuos y auditorías regulares de nuestros sistemas para identificar y mitigar cualquier posible vulnerabilidad de seguridad.</li>
        </ul>
        <h3 className="text-3xl">Compartición de Información</h3>
        <ul>
            <li>Usuarios Autorizados: La información académica y personal se comparte únicamente con usuarios autorizados, como padres, maestros y administradores escolares, que han pasado por nuestro proceso de autenticación segura.</li>
            <li>Consentimiento Informado: Antes de compartir cualquier dato, nos aseguramos de obtener el consentimiento necesario de los usuarios involucrados, respetando su derecho a la privacidad.</li>
            <li>Política de No Compartir con Terceros: No compartimos información personal con terceros sin el consentimiento explícito de nuestros usuarios, a menos que sea requerido por la ley.</li>
        </ul>
        <h3 className="text-3xl">Derechos de los Usuarios</h3>
        <ul>
            <li>Acceso y Control: Los usuarios tienen el derecho de acceder, actualizar y eliminar su información personal en cualquier momento. Proporcionamos interfaces fáciles de usar para gestionar estos derechos.</li>
            <li>Transparencia: Mantenemos a nuestros usuarios informados sobre nuestras prácticas de privacidad y cualquier cambio en nuestras políticas, asegurando transparencia en todo momento.</li>
        </ul>
        <p>En Edumétrica, nos comprometemos a proteger la privacidad de nuestros usuarios y a manejar su información con el máximo cuidado y respeto. Gracias por confiar en nosotros.</p>
    </div>
  )
}

export default Privacy