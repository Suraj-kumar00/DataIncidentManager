'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function TechStack() {
    const technologies = [
        {
            category: 'Orchestration',
            name: 'Kestra',
            description: 'Workflow engine & AI Agent framework',
            logo: '/images/kestra.png',
            isImage: true,
            color: 'purple',
        },
        {
            category: 'AI Model',
            name: 'Perplexity Sonar',
            description: 'Unlimited free tier for AI analysis',
            logo: '🤖',
            isImage: false,
            color: 'blue',
        },
        {
            category: 'Database',
            name: 'PostgreSQL 15',
            description: 'Kestra data persistence',
            logo: '🐘',
            isImage: false,
            color: 'cyan',
        },
        {
            category: 'Runtime',
            name: 'Docker Compose',
            description: 'Container orchestration',
            logo: '🐋',
            isImage: false,
            color: 'blue',
        },
        {
            category: 'Language',
            name: 'Python 3.11',
            description: 'Scripting & data processing',
            logo: '🐍',
            isImage: false,
            color: 'green',
        },
        {
            category: 'Shell',
            name: 'Bash',
            description: 'Automation scripts',
            logo: '💻',
            isImage: false,
            color: 'gray',
        },
    ]

    return (
        <section className="py-24 px-6 bg-gray-900">
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
                        Tech Stack
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Built with powerful, production-ready technologies
                    </p>
                </motion.div>

                {/* Tech grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gray-800 border-2 border-gray-700 p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-full">
                                <div className="flex items-start space-x-4">
                                    {tech.isImage ? (
                                        <div className="w-12 h-12 relative flex-shrink-0">
                                            <Image
                                                src={tech.logo}
                                                alt={tech.name}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-5xl flex-shrink-0">{tech.logo}</div>
                                    )}
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-500 mb-1">{tech.category}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                                        <p className="text-gray-400 text-sm">{tech.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Key features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Why This Stack?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Open Source',
                                description: 'No vendor lock-in, MIT licensed',
                                icon: '🔓',
                            },
                            {
                                title: 'Production Ready',
                                description: 'Battle-tested components',
                                icon: '🚀',
                            },
                            {
                                title: 'Cost Effective',
                                description: 'Free tier AI + open source',
                                icon: '💰',
                            },
                        ].map((feature, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl mb-3">{feature.icon}</div>
                                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
