"use client";
import Link from "next/link";

const Icons = {
    logo: () => (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
};

export default function Footer() {
    return (
        <footer className="py-12 px-4 md:px-6 z-50 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
                            <div className="h-6 w-6 bg-purple-600 rounded-md flex items-center justify-center p-1">
                                <Icons.logo />
                            </div>
                            <span className="font-bold lg:inline-block text-white">DataIncidentManager</span>
                        </Link>

                        <h1 className="text-gray-400 mt-4">
                            Built by{" "}
                            <span className="text-purple-400 gap-2">
                                <Link className="underline hover:text-purple-300" href="https://github.com/Suraj-kumar00">
                                    @Suraj
                                </Link>
                            </span>
                        </h1>

                        <p className="text-sm text-gray-500 mt-5">
                            © {new Date().getFullYear()} DataIncidentManager. Licensed under MIT.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4 text-white">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="https://github.com/Suraj-kumar00/DataIncidentManager"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/Suraj-kumar00/DataIncidentManager#quick-start"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Quick Start
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/Suraj-kumar00/DataIncidentManager/blob/main/CONTRIBUTING.md"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Contributing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-white">Socials</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="https://github.com/Suraj-kumar00/DataIncidentManager"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://linkedin.com/in/suraj-kumar00"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        LinkedIn
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://twitter.com"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        X
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-white">Built With</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="https://kestra.io"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Kestra
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.perplexity.ai"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Perplexity AI
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full flex mt-4 items-center justify-center">
                    <h1 className="text-center text-3xl md:text-5xl lg:text-[8rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-700 to-gray-900 select-none">
                        DataIncidentManager
                    </h1>
                </div>
            </div>
        </footer>
    );
}
