'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold">D</span>
                        </div>
                        <span className="font-bold text-xl text-white">DataIncidentManager</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#architecture" className="text-gray-400 hover:text-white transition-colors">
                            Architecture
                        </Link>
                        <Link href="#demo" className="text-gray-400 hover:text-white transition-colors">
                            Demo
                        </Link>
                        <Link href="#impact" className="text-gray-400 hover:text-white transition-colors">
                            Impact
                        </Link>
                    </div>

                    {/* CTA */}
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white border-0"
                        onClick={() => window.open('https://github.com/Suraj-kumar00/DataIncidentManager', '_blank')}
                    >
                        <Github className="mr-2 h-4 w-4" />
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    )
}
