import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"

const Header = () => {
    return (
        <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>

            {/* Image */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
                <Image src={assets.profile_img} alt='' className='rounded-full w-32' />
            </motion.div>

            {/* Name */}
            <motion.h3
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='flex gap-2 text-xl md:text-2xl mb-3 items-center' style={{ fontFamily: "var(--font-ovo)" }}
            >
                Hi! I'm William Mark <Image src={assets.hand_icon} alt='' className='w-6' />
            </motion.h3>

            {/* big text */}
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className='text-3xl sm:text-6xl lg:text-[66px]' style={{ fontFamily: "var(--font-ovo)" }}
            >
                frontend web developer based in London.
            </motion.h1>

            {/* description */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className='max-w-2xl mx-auto' style={{ fontFamily: "var(--font-ovo)" }}
            >
                I am a frontend developer from California, USA with 10 years of experience in multiple companies like Microsoft, Tesla and Apple.
            </motion.p>

            {/* buttons */}
            <div className='flex flex-row items-center gap-4 mt-4'>
                <motion.a
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    href="#contact"
                    className='sm:px-10 sm:py-3 px-5 py-2 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'
                >
                    contact me <Image src={assets.right_arrow_white} alt='' className='w-4' />
                </motion.a>
                <motion.a
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    href="/sample-resume.pdf" download
                    className='sm:px-10 sm:py-3 px-5 py-2 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'
                >
                    my resume <Image src={assets.download_icon} alt='' className='w-4' />
                </motion.a>
            </div>
        </div>
    )
}

export default Header