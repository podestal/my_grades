import { name, footerLinks } from "../../constants"
import google from '../../assets/icons/google.svg'
import apple from '../../assets/icons/apple.svg'
import logo from '../../assets/icons/edumetrica-logo.svg'
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='flex justify-center items-center flex-col sm:py-16 py-6 relative z-40 mt-16'>
        <div className='flex justify-center items-start md:flex-row flex-col mb-8 w-full'>
            <div className="flex-1 flex flex-col justify-start mr-10">
                <a href="/#header"><img src={logo} width={200}/></a>
                {/* <Link to={'/'}><img src={logo} width={200}/></Link> */}
                <p className='mt-4  max-w-[310px] font-poppins font-normal text-slate-400 text-[18px] leading-[30.8px]'>
                    Información académica al alcance de todos.
                </p>
                <div className="flex flex-row gap-4 items-center justify-start my-4">
                    <img src={google} alt="google" className="w-[128px] h-[42px] object-contain mr-5 cursor-pointer" />
                    <img src={apple} alt="apple" className="w-[128px] h-[42px] object-contain cursor-pointer" />
                </div>
            </div>
            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                {footerLinks.map( footerLink => (
                    <div
                        key={footerLink.title}
                        className="flex flex-col ss:my-0 my-4 min-w-[150px]"
                    >
                        <h4 className="font-poppins font-medium text-[22px] leading-[27px] text-white">{footerLink.title}</h4>
                        <ul className="list-none mt-4">
                            {footerLink.links.map( (link, idx) => (
                                <li
                                    key={link.name}
                                    className={`font-normal font-poppins text-[16px] text-slate-400 hover:text-white leading-[24px] text-dimWhite hover:text-secondary cursor-pointer
                                    ${idx !== footerLink.links.length - 1 ? 'mb-4' : 'mb-0'}`}
                                >
                                    {link.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-6'>
            <p className="font-poppins font-normal text-center text-[18px] leading[27px] text-white mb-6">2024 {name}. Todos los derechos reservados.</p>
        </div>
    </footer>
  )
}

export default Footer

// boxWidth: "xl:max-w-[1280px] w-full",
  
// heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
// paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

// flexCenter: "flex justify-center items-center",
// flexStart: "flex justify-center items-start",

// paddingX: "sm:px-16 px-6",
// paddingY: "sm:py-16 py-6",
// padding: "sm:px-16 px-6 sm:py-12 py-4",

// marginX: "sm:mx-16 mx-6",
// marginY: "sm:my-16 my-6",

//LAYOUT

// section: `flex md:flex-row flex-col ${styles.paddingY}`,
// sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

// sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
// sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

// sectionInfo: `flex-1 ${styles.flexStart} flex-col`,