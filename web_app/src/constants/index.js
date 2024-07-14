export const name = 'Edumétrica'
import { RiLockFill, RiGlobalLine, RiDragDropFill, RiCustomerService2Fill } from "@remixicon/react"

import academicProgress from '../assets/academic-progress.png'
import automationLanding from '../assets/automation-landing.png'
import visualizationLanding from '../assets/visualization-landing.png'
import customizableLanding from '../assets/customizable-landing.png'
import accessLanding from '../assets/access-landing.png'

export const features = [
    {
        title: 'Acceso 24/7 y Notificaciones',
        description: 'Los padres pueden iniciar sesión en la aplicación utilizando sus credenciales proporcionadas para ver la asistencia, calificaciones, actividades y anuncios de su hijo las 24 horas del día, los 7 días de la semana. Ademéas envío de notificaciones sobre cualquier actualización relacionada con la asistencia, actividades, calificaciones y anuncios.',
        imgUrl: accessLanding,
        styles: 'flex-row-reverse',
    },
    {
        title: 'Automatización del Proceso de Calificación',
        description: 'La aplicación cuenta con herramientas avanzadas que automatizan el proceso de calificación, permitiendo a los maestros ahorrar tiempo y reducir errores. Los maestros pueden ingresar los resultados de las evaluaciones y la aplicación se encarga de calcular automáticamente las calificaciones finales, generando informes detallados y precisos.',
        imgUrl: automationLanding,
        styles: ''
    },
    {
        title: 'Visualización de Información Académica',
        description: 'La aplicación ofrece una visualización clara y detallada de la información académica de los estudiantes. Los maestros pueden acceder a gráficos, tablas y reportes que muestran el rendimiento y progreso de los estudiantes de manera comprensible. Esta funcionalidad ayuda a identificar áreas de mejora y a tomar decisiones informadas sobre el proceso de enseñanza.',
        imgUrl: visualizationLanding,
        styles: 'flex-row-reverse',
    },
    {
        title: 'Altamente Personalizable',
        description: 'Los maestros tienen la capacidad de personalizar la aplicación para adaptarse a sus métodos de enseñanza y evaluación. Pueden crear y gestionar actividades específicas, definir categorías de evaluación, y configurar anuncios personalizados. Esta flexibilidad permite a los maestros diseñar un entorno de aprendizaje que se ajuste a las necesidades individuales de sus estudiantes.',
        imgUrl: customizableLanding,
        styles: '',
    },
]

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
        question: '¿Cómo reporto un problema técnico?',
        answer: 'Puede reportar problemas técnicos contactando al equipo de soporte a través de la sección de soporte de la aplicación o mediante la información de contacto proporcionada.'
    },
    {
        question: '¿Qué dispositivos y navegadores son compatibles?',
        answer: 'La aplicación es compatible con los principales navegadores como Chrome, Firefox, Safari y Edge, y se puede acceder desde computadoras de escritorio, tabletas y teléfonos inteligentes.'
    }
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
                link: '/careers'
            },
            {
                name: 'Privacidad',
                link: '/privacy'
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