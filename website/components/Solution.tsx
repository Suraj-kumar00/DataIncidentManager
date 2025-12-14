'use client'

import { motion } from 'framer-motion'
import { Bot, Database, Zap, Shield, Bell, Cog } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Solution() {
    const features = [
        {
            icon: Bot,
            title: 'AI-Powered Analysis',
            description: 'Uses Perplexity Sonar AI to intelligently analyze incidents with multi-system context',
            highlight: 'Unlimited free tier',
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: Database,
            title: 'Multi-System Context',
            description: 'Automatically gathers data from Snowflake, Airflow, dbt, and more',
            highlight: '10+ integrations',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Zap,
            title: 'Real-Time Response',
            description: '30-second end-to-end response time from alert to action',
            highlight: '99.8% faster',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: Shield,
            title: 'Smart Routing',
            description: 'Dismiss false positives, log minor issues, notify teams, or auto-remediate',
            highlight: '90% FP reduction',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: Bell,
            title: 'Rich Notifications',
            description: 'Context-aware Slack messages with root cause and business impact',
            highlight: 'Always relevant',
            color: 'from-pink-500 to-pink-600',
        },
        {
            icon: Cog,
            title: 'Auto-Remediation',
            description: 'Automatically fix known issues (restart DAGs, backfill data, etc.)',
            highlight: 'Zero touch',
            color: 'from-indigo-500 to-indigo-600',
        },
    ]

    return (
        <section id="features" className="py-24 px-6 bg-gray-900">
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
                        Our Solution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        An AI-powered incident management system that autonomously receives, analyzes, and acts on alerts
                    </p>
                </motion.div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gray-800 border-2 border-gray-700 p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 h-full hover:scale-105">
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg`}>
                                            <feature.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 mb-4 flex-grow">{feature.description}</p>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold w-fit">
                                        ✓ {feature.highlight}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
