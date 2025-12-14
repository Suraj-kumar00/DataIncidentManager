'use client'

import { motion } from 'framer-motion'
import { TrendingDown, DollarSign, Clock, Target } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function BusinessImpact() {
    const metrics = [
        {
            icon: Clock,
            label: 'MTTR',
            before: '4 hours',
            after: '30 sec',
            improvement: '99.8% faster',
            color: 'green',
        },
        {
            icon: DollarSign,
            label: 'Cost',
            before: '$22,400',
            after: '$400',
            improvement: '$22K saved',
            color: 'blue',
        },
        {
            icon: Target,
            label: 'False Positives',
            before: '90%',
            after: '<10%',
            improvement: '90% reduction',
            color: 'purple',
        },
        {
            icon: TrendingDown,
            label: 'Availability',
            before: '8x5 on-call',
            after: '24/7 autonomous',
            improvement: 'Always-on',
            color: 'pink',
        },
    ]

    const roi = [
        { metric: 'Downtime savings', value: '$220,000' },
        { metric: 'Alert fatigue reduction', value: '$810,000' },
        { metric: 'Total annual value', value: '$1.03M' },
        { metric: 'Payback period', value: 'First incident' },
    ]

    return (
        <section id="impact" className="py-24 px-6 bg-gray-900">
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
                        Business Impact
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Real savings, measurable results
                    </p>
                </motion.div>

                {/* Metrics comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gray-800 border-2 border-gray-700 p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-full">
                                <div className="flex flex-col h-full">
                                    <metric.icon className={`h-8 w-8 text-${metric.color}-400 mb-4`} />
                                    <h3 className="text-lg font-semibold text-white mb-3">{metric.label}</h3>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-gray-500 line-through text-sm">{metric.before}</span>
                                        <span className="text-xl text-gray-400">→</span>
                                        <span className={`text-xl font-bold text-${metric.color}-400`}>{metric.after}</span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold`}>
                                            ✓ {metric.improvement}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* ROI breakdown - removed Implementation time */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-2 border-green-500/30 rounded-2xl p-8"
                >
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        Annual ROI (10 Critical Incidents/Year)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {roi.map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-gray-400 text-sm mb-2">{item.metric}</div>
                                <div className="text-2xl md:text-3xl font-bold text-green-400">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Assuming 10 critical incidents/year per organization
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
