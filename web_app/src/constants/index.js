export const name = 'Edumétrica'
import { RiLockFill, RiGlobalLine, RiDragDropFill, RiCustomerService2Fill } from "@remixicon/react"


export const faqs = [
    {
        question: '¿Cuál es el propósito de esta aplicación web?',
        answer: ' Esta aplicación web está diseñada para seguir el progreso académico de los estudiantes, procesar esos datos para los padres y permitir que los maestros publiquen información como asistencias, calificaciones, actividades y anuncios.',
    },
    {
        question: '¿Quién puede acceder a esta aplicación web?',
        answer: 'La aplicación es accesible para maestros, padres y administradores escolares autorizados.',
    },
    {
        question: '¿Cómo puedo acceder a la información académica de mi hijo?',
        answer: 'Los padres pueden iniciar sesión en la aplicación mobile utilizando sus credenciales proporcionadas para ver la asistencia, calificaciones, actividades y anuncios de su hijo las 24 horas del día, los 7 días de la semana.',
    },
    {
        question: '¿Recibiré notificaciones sobre las actualizaciones académicas de mi hijo?',
        answer: 'Sí, recibirá notificaciones sobre actualizaciones relacionadas con la asistencia, actividades, calificaciones y anuncios.',
    },
    {
        question: '¿Qué tan segura es la información académica de mi hijo?',
        answer: 'La aplicación emplea medidas de seguridad robustas, incluyendo encriptación y autenticación segura, para garantizar que la información académica de su hijo esté protegida.',
    },
    {
        question: '¿Cómo puedo personalizar actividades, categorías y métodos de calificación?',
        answer: 'La aplicación permite a los maestros crear y personalizar actividades, categorías y métodos de calificación para adaptarse a sus necesidades específicas y estilos de enseñanza.',
    },
    {
        question: '¿Existe una forma de visualizar el progreso académico de los estudiantes?',
        answer: 'Sí, la aplicación ofrece herramientas de visualización completas para ayudar a los maestros a monitorear y evaluar el progreso académico de los estudiantes de manera efectiva.',
    },
]

export const reasons = [
    {
        title: 'Seguridad',
        description: 'La seguridad es una prioridad en Edumétrica. Utilizamos encriptación avanzada para proteger la información académica.',
        icon: RiLockFill,
    },
    {
        title: 'Facilidad de Uso',
        description: 'Con una interfaz intuitiva y amigable, tanto los padres como los maestros pueden navegar y utilizar todas las funciones de manera eficiente.',
        icon: RiDragDropFill,
    },
    {
        title: 'Soporte Técnico 24/7',
        description: 'Ofrecemos soporte técnico disponible las 24 horas del día, los 7 días de la semana, para resolver cualquier problema o duda que pueda surgir.',
        icon: RiCustomerService2Fill
    },
    {
        title: 'Acceso',
        description: 'Nuestra aplicación es accesible desde cualquier dispositivo con conexión a Internet, incluyendo computadoras de escritorio, tabletas y teléfonos inteligentes. ',
        icon: RiGlobalLine,
    },
]

export const footerLinks = [
    {
        title: 'Recursos',
        links: [
            {
                name: 'Características',
                link: '/#faq'
            },
            {
                name: 'Por qué',
                link: '/#contact'
            },

        ]
    },
    {
        title: 'Empresa',
        links: [
            {
                name: 'Carreras',
                link: '/#faq'
            },
            {
                name: 'Privacidad',
                link: '/#contact'
            },

        ]
    },
    {
        title: 'Soporte',
        links: [
            {
                name: 'Preguntas Frequentes',
                link: '/#faq'
            },
            {
                name: 'Contáctenos',
                link: '/#contact'
            },

        ]
    },
]