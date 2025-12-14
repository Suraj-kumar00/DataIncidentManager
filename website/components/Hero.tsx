'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden px-6 pt-20 bg-gradient-to-br from-[#1a1f2e] via-[#252b3d] to-[#1a1f2e]">
            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto pt-16">
                {/* Top section with text */}
                <div className="text-center mb-8">
                    {/* Introducing badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 inline-block"
                    >
                        <div className="px-5 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-sm">
                            <span className="text-gray-300 text-sm flex items-center gap-2 font-medium">
                                <span className="text-purple-400">✨</span> Introducing
                            </span>
                        </div>
                    </motion.div>

                    {/* Main title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
                    >
                        DataIncidentManager
                    </motion.h1>

                    {/* Underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 w-48 md:w-72 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6"
                    />

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
                    >
                        <span className="font-semibold text-white">AI-Powered</span> Autonomous{' '}
                        <span className="font-semibold text-white">Incident Management</span> for{' '}
                        <span className="font-semibold text-white">Data Teams</span>
                    </motion.p>

                    {/* Tech logos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-8"
                    >
                        {[
                            { name: 'CodeRabbit', color: 'text-[#FF6B35]' },
                            { name: 'Kestra', color: 'text-[#7C3AED]' },
                            { name: 'Docker', color: 'text-[#2496ED]' },
                            { name: 'Vercel', color: 'text-white' },
                            { name: 'Perplexity', color: 'text-[#20B2AA]' },
                        ].map((tech, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                            >
                                <span className={`${tech.color} font-semibold text-sm`}>{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button - positioned above dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="relative z-20 mb-8"
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold border-0 shadow-lg shadow-purple-500/30"
                            onClick={() => window.open('https://github.com/Suraj-kumar00/DataIncidentManager', '_blank')}
                        >
                            <Github className="mr-2 h-5 w-5" />
                            Get Started on GitHub
                        </Button>
                    </motion.div>
                </div>

                {/* Dashboard Preview - positioned below with perspective */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="relative mx-auto max-w-5xl"
                >
                    {/* Browser window frame */}
                    <div className="bg-gray-800 rounded-t-xl p-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                            localhost:8080/ui/main/dashboard
                        </div>
                    </div>

                    {/* Dashboard image */}
                    <div className="relative overflow-hidden rounded-b-xl border-x border-b border-gray-700">
                        <Image
                            src="/images/s1.png"
                            alt="Kestra Dashboard"
                            width={1200}
                            height={700}
                            className="w-full h-auto"
                        />
                        {/* Fade overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
