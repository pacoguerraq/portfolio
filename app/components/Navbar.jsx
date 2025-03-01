import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = ({ isDarkMode, setIsDarkMode }) => {

    const [isScroll, setIsScroll] = useState(false)
    const sideMenuRef = useRef()
    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        })
    }, [])

    return (
        <>

            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
                <Image src={assets.header_bg_color} alt='' className='w-full' />
            </div>

            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white/50  backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20 dark:border-b dark:border-white/20" : ""}`}>

                {/* logo */}
                <a href="#top">
                    <Image src={isDarkMode ? assets.logo_dark : assets.logo} className='w-36 cursor-pointer' alt='' />
                </a>

                {/* big screen */}
                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? '' : 'bg-white/50 shadow-sm dark:border dark:border-white/20 dark:bg-transparent'}`}>
                    {/* <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} href="#top">Home</a></li> */}
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} href="#about">About me</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} href="#services">Services</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} href="#work">My work</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} href="#contact">Contact me</a></li>
                </ul>

                <div className='flex items-center gap-2'>

                    {/* light / dark icon */}
                    <button onClick={() => setIsDarkMode(prev => !prev)} className='cursor-pointer hover:bg-gray-200 dark:hover:bg-darkHover w-10 h-10 hover:rounded-full'>
                        <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='' className='w-6 mx-auto' />
                    </button>

                    {/* contact button */}
                    <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50 hover:bg-gray-200 dark:hover:bg-darkHover ' style={{ fontFamily: "var(--font-ovo)" }}>
                        Contact <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt='' className='w-3' />
                    </a>

                    {/* hamburguer button */}
                    <button className='block md:hidden cursor-pointer hover:bg-gray-200 dark:hover:bg-darkHover w-10 h-10 hover:rounded-full' onClick={openMenu}>
                        <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6 mx-auto' />
                    </button>

                </div>

                {/* mobile menu */}
                <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white'>

                    <div className='absolute right-6 top-6' onClick={closeMenu}>
                        <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer' />
                    </div>

                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} onClick={closeMenu} href="#top">Home</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} onClick={closeMenu} href="#about">About me</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} onClick={closeMenu} href="#services">Services</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} onClick={closeMenu} href="#work">My work</a></li>
                    <li><a className='font-Ovo hover:text-gray-400' style={{ fontFamily: "var(--font-ovo)" }} onClick={closeMenu} href="#contact">Contact me</a></li>
                </ul>

            </nav>
        </>
    )
}

export default Navbar