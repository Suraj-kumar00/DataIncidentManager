'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Architecture() {
    return (
        <section id="architecture" className="py-24 px-6 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Architecture
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Built on Kestra's powerful orchestration platform with AI-powered decision making
                    </p>
                </motion.div>

                {/* Architecture diagram - using the SVG image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-8 mb-12 shadow-lg overflow-hidden"
                >
                    <div className="relative w-full">
                        <Image
                            src="/images/architecture.svg"
                            alt="DataIncidentManager Architecture Diagram"
                            width={1200}
                            height={800}
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                    </div>
                </motion.div>

                {/* System components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Orchestration',
                            tech: 'Kestra',
                            description: 'Workflow engine & AI Agent framework',
                            color: 'from-purple-500 to-purple-700',
                        },
                        {
                            title: 'AI Model',
                            tech: 'Perplexity Sonar',
                            description: 'Decision-making & root cause analysis',
                            color: 'from-blue-500 to-blue-700',
                        },
                        {
                            title: 'Backend',
                            tech: 'PostgreSQL 15',
                            description: 'Kestra data persistence',
                            color: 'from-pink-500 to-pink-700',
                        },
                    ].map((component, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-lg"
                        >
                            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${component.color} text-white text-sm font-semibold mb-3`}>
                                {component.title}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{component.tech}</h3>
                            <p className="text-gray-400">{component.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
