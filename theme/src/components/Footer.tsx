import type { ThemeConfig } from '../types'
import Link from 'next/link'

interface LogoConfig {
    text?: string;
    image?: string;
    height?: number;
}

export function Footer({ themeConfig }: { themeConfig?: ThemeConfig }) {
    const siteName = themeConfig?.siteName || 'Site Name'
    
    return (
        <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-sprunki-pink-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-sm text-theme-text-secondary">
                    {new Date().getFullYear()} © {' '}
                    <Link 
                        href="/" 
                        className="text-sprunki-pink-500 hover:text-sprunki-pink-400 transition-colors"
                    >
                        {siteName}
                    </Link>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    )
}