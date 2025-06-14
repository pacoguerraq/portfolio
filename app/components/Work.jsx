import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"
import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from 'next/link'
import { ExternalLink } from "lucide-react"
import { DialogTitle } from '@radix-ui/react-dialog'

const Work = ({ isDarkMode }) => {

    const [showAll, setShowAll] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id='work' className='w-full px-[12%] py-10 scroll-mt-20'
        >
            <motion.h4
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-center mb-2 text-lg' style={{ fontFamily: "var(--font-ovo)" }}
            >
                My Portfolio
            </motion.h4>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='text-center text-5xl' style={{ fontFamily: "var(--font-ovo)" }}
            >
                My Latest Work
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className='text-center max-w-2xl mx-auto mt-5 mb-12' style={{ fontFamily: "var(--font-ovo)" }}
            >
                A showcase of web apps, e-commerce platforms, and AI tools built for efficiency and great user experience.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] my-10 gap-5 dark:text-black"
            >
                {workData.slice(0, showAll ? workData.length : 4).map((project, index) => (
                    <Dialog key={index}>

                        {/* card */}
                        <DialogTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                style={{ backgroundImage: `url(${project.bgImage})` }}
                                className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
                            >
                                {/* in progress badge */}
                                {project.inProgress && (
                                    <Badge style={{ backgroundColor: 'orange', color: 'black' }} className="absolute top-3 left-3">
                                        In Progress
                                    </Badge>
                                )}
                                <div className="bg-white w-10/12 max-w-[90%] rounded-md absolute bottom-5 inset-x-0 mx-auto py-3 px-5 flex items-center justify-between duration-500 group-hover:translate-y-[-4px]">
                                    <div>
                                        <h2 className="font-semibold">{project.title}</h2>
                                        <p className="text-sm text-gray-700">{project.type}</p>
                                    </div>
                                    <div className="border border-solid rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                                        <Image src={assets.send_icon} alt="send icon" className="w-5" />
                                    </div>
                                </div>
                            </motion.div>
                        </DialogTrigger>

                        {/* dialog */}
                        <DialogContent className="p-0">
                            <div className="relative w-full h-[400px] rounded-lg">

                                {/* image */}
                                <Image src={project.bgImage || "/placeholder.svg"} alt={project.title} fill className="object-cover rounded-lg" />

                                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                                <div className="absolute bottom-4 left-4 rounded-lg">

                                    {/* type */}
                                    <Badge variant="secondary" className="mb-2">
                                        {project.type}
                                    </Badge>

                                    {/* title */}
                                    <DialogTitle className="text-2xl font-bold text-white">{project.title}</DialogTitle>

                                </div>
                            </div>

                            <div className="px-6 py-4">

                                {/* in progress badge */}
                                {project.inProgress && (
                                    <Badge style={{ backgroundColor: 'orange', color: 'black' }} className="mb-4">
                                        In Progress
                                    </Badge>
                                )}

                                {/* description */}
                                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                                <div className="mb-4">
                                    <h3 className="text-sm font-medium mb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge key={tech} variant="outline">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {(project.link && !project.inProgress) && (
                                    <Button asChild variant="" size="sm" className="w-full">
                                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <span>Visit Project</span>
                                            <ExternalLink size={16} />
                                        </Link>
                                    </Button>
                                )}
                                {project.inProgress && (
                                    <Button variant="secondary" size="sm" style={{ backgroundColor: 'orange', color: 'black' }} className="w-full" disabled>
                                        <span>Coming Soon</span>
                                        <ExternalLink size={16} />
                                    </Button>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </motion.div>


            {workData.length > 4 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    onClick={() => setShowAll(!showAll)}
                    className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-solid border-gray-700 rounded-full py-3 px-10 mx-auto mb-20 mt-14 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover cursor-pointer"
                >
                    {showAll ? "Show Less" : "Show More"}
                    <Image
                        src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold}
                        alt="right arrow"
                        className={`w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                    />
                </motion.button>
            )}

        </motion.div>
    )
}

export default Work