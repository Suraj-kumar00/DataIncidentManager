'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Kestra Execution Dashboard',
            description: 'Real-time monitoring of incident processing workflows',
            image: '/images/s1.png',
        },
        {
            number: '02',
            title: 'AI Analysis in Action',
            description: 'Perplexity AI analyzes multi-system context and determines root cause',
            image: '/images/s2.png',
        },
        {
            number: '03',
            title: 'Smart Decision Making',
            description: 'AI decides action: dismiss false positive, log, notify, or auto-fix',
            image: '/images/s3.png',
        },
        {
            number: '04',
            title: 'Flow Orchestration',
            description: 'Kestra workflows handle complex incident management logic',
            image: '/images/s4.png',
        },
        {
            number: '05',
            title: 'Workflow Details',
            description: 'Detailed view of each workflow step and decision point',
            image: '/images/s5.png',
        },
        {
            number: '06',
            title: 'System Integration',
            description: 'Seamless integration with monitoring and notification systems',
            image: '/images/s6.png',
        },
        {
            number: '07',
            title: 'Complete Overview',
            description: 'Full system dashboard showing all active incidents and workflows',
            image: '/images/s7.png',
        },
    ]

    return (
        <section id="demo" className="py-24 px-6 bg-gray-900">
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
                        See It In Action
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Watch how DataIncidentManager handles real incidents autonomously
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-16">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                        >
                            {/* Content */}
                            <div className="flex-1">
                                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-xl text-gray-400">{step.description}</p>
                            </div>

                            {/* Screenshot */}
                            <div className="flex-1">
                                <Card className="bg-gray-800 border-2 border-gray-700 p-4 overflow-hidden shadow-lg">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        width={800}
                                        height={500}
                                        className="rounded-lg w-full h-auto"
                                    />
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
