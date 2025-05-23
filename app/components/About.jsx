import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const About = ({ isDarkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id='about' className='w-full px-[12%] py-10 scroll-mt-20'
        >
            <motion.h4
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-center mb-2 text-lg' style={{ fontFamily: "var(--font-ovo)" }}
            >
                Introduction
            </motion.h4>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='text-center text-5xl' style={{ fontFamily: "var(--font-ovo)" }}
            >
                About me
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='flex w-full flex-col lg:flex-row items-center gap-20 mb-20 mt-10'
            >

                {/* Image - LEFT SIDE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className='w-64 sm:w-80 rounded-3xl max-w-none'
                >
                    <Image src={assets.user_image} alt='user' className='w-full rounded-3xl' />
                </motion.div>

                {/* RIGHT SIDE */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className='flex-1 w-full'
                >

                    {/* description */}
                    <p className='mb-10 text-center ' style={{ fontFamily: "var(--font-ovo)" }}>
                        I am a software developer with expertise in modern web technologies, cloud computing, and API integrations. I have built scalable and efficient applications for various industries, leveraging AWS, Next.js, and database management. Passionate about building user-friendly and high-performance digital solutions.
                    </p>

                    {/* Info */}
                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className='grid grid-cols-1 sm:grid-cols-2 gap-6'
                    >
                        {infoList.map(({ icon, iconDark, title, description }, index) => (
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                key={index}
                                className='border-[0.5px] border-solid border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50'
                            >
                                <Image src={isDarkMode ? iconDark : icon} alt={title} className='w-7 mt-3' />
                                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                                <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Tools */}
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className='my-6 text-gray-700 dark:text-white/80' style={{ fontFamily: "var(--font-ovo)" }}
                    >
                        Tools I use
                    </motion.h4>

                    <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                        className='items-center gap-3 sm:gap-5 grid grid-cols-[repeat(auto-fit,minmax(45px,1fr))]'
                    >
                        {toolsData.map(({ name, icon, darkIcon }, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <motion.li
                                            whileHover={{ scale: 1.1 }}
                                            className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-solid border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                                        >
                                            <Image src={isDarkMode ? darkIcon : icon} alt='tool' className='w-5 sm:w-7' />
                                        </motion.li>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </motion.ul>

                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default About