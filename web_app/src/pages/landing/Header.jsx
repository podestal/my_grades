import {useState} from 'react'
import { Link } from 'react-router-dom'
import hamburger from '../../assets/icons/menu.svg'
import close from '../../assets/icons/close.svg'

const Header = () => {

    const [toggle, setToggle] = useState(false)

  return (
    <nav className='flex justify-between py-6 items-center max-w-[1440px] my-0 mx-auto relative z-10'>
        <h1 className='text-white text-4xl font-bold'>LOGO</h1>
        <div className='flex-1 flex justify-end items-center gap-16 max-lg:hidden'>
            <Link className='font-montserrat text-white-400 text-xl hover:text-white' to={'/'}>Principal</Link>
            <Link className='font-montserrat text-white-400 text-xl hover:text-white' to={'/features'}>Carácterísticas</Link>
            <Link className='font-montserrat text-white-400 text-xl hover:text-white' to={'/login'}>Ingresar</Link>
        </div>
        <div className='hidden max-lg:block'>
            <img src={toggle ? close : hamburger} onClick={() => setToggle( prev => !prev)} alt="Hamburger" width={25} height={25}/>
            <div className={`${toggle ? 'flex' : 'hidden'} p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] bg-primary`}>
                <div className='flex flex-col justify-end items-center gap-10'>
                    <Link className='font-montserrat text-white text-lg' to={'/'}>Principal</Link>
                    <Link className='font-montserrat text-white text-lg' to={'/features'}>Carácterísticas</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header