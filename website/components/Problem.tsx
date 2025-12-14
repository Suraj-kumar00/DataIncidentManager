'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, DollarSign, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Problem() {
    const problems = [
        {
            icon: Clock,
            title: 'Slow Response Time',
            description: '4-8 hour MTTR due to manual investigation across 10+ monitoring tools',
            impact: '$22,400 cost per incident',
            color: 'red',
        },
        {
            icon: AlertTriangle,
            title: 'Alert Fatigue',
            description: '90% false positive rate leads to ignored critical alerts',
            impact: '$810K annual waste',
            color: 'orange',
        },
        {
            icon: DollarSign,
            title: 'Data Downtime Cost',
            description: '$5,600/minute average cost of data downtime',
            impact: '$3M+ wasted annually',
            color: 'yellow',
        },
        {
            icon: Users,
            title: 'Engineer Burnout',
            description: '30-40% of time spent context-switching between systems',
            impact: 'Critical incidents missed',
            color: 'purple',
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
                        The Problem
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Modern data teams face a critical operational challenge with incident management
                    </p>
                </motion.div>

                {/* Problem cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {problems.map((problem, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className={`p-6 border-2 border-${problem.color}-500/30 bg-gray-800 hover:shadow-lg hover:shadow-${problem.color}-500/20 transition-all duration-300 h-full`}>
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg bg-${problem.color}-500/20 border border-${problem.color}-500/30`}>
                                        <problem.icon className={`h-6 w-6 text-${problem.color}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                                        <p className="text-gray-400 mb-3">{problem.description}</p>
                                        <div className={`text-sm font-semibold text-${problem.color}-400`}>
                                            Impact: {problem.impact}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Key stat */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block bg-red-900/20 border-2 border-red-500/30 rounded-2xl px-8 py-6">
                        <p className="text-gray-400 mb-2">Organizations lack full-stack observability</p>
                        <p className="text-5xl font-bold text-red-400">73%</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
