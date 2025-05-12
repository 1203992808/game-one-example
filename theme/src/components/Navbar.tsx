import * as React from 'react'
import { useRouter } from 'nextra/hooks'
import Link from 'next/link'
import { LocaleSwitch } from './LocaleSwitch'
import { ThemeSwitch } from './ThemeSwitch'
import { useFSRoute } from 'nextra/hooks'
import { Icon } from '@iconify/react'
import { useThemeConfig } from '../contexts'
import type { PageMapItem } from 'nextra'

type MenuItem = {
    title: string
    type: string
    icon?: string
    route?: string
    href?: string
    items?: Record<string, MenuItem>
    key?: string
}

interface MetaJsonFile {
    kind: 'Meta'
    data: Record<string, MenuItem>
}

interface NavbarProps {
    meta?: any
}

// 添加 Logo 配置类型
interface LogoConfig {
    text: string;
    image: string;
    height: number;
}

// 扩展主题配置类型
interface ThemeConfig {
    features?: {
        i18n?: boolean;
        themeSwitch?: boolean;
    };
    siteName?: string;
    logo?: LogoConfig;
    primaryColor?: string;
}

export function Navbar({ meta }: NavbarProps) {
    const router = useRouter()
    const { asPath, locale = 'en' } = router
    const themeConfig = useThemeConfig() as ThemeConfig
    const siteName = themeConfig?.siteName
    const primaryColor = themeConfig?.primaryColor || '#e552aa'
    const fsRoute = useFSRoute()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    // 检查主题切换功能是否启用
    const themeEnabled = themeConfig?.features?.themeSwitch ?? false
    const i18nEnabled = themeConfig?.features?.i18n ?? false

    console.log('themeConfig:', themeConfig)
    console.log('i18nEnabled:', i18nEnabled)
    console.log('features:', themeConfig?.features)

    // 处理菜单配置
    const menuConfig = React.useMemo(() => {
        if (!meta) return {}
        if (typeof meta === 'function') return meta()
        return meta
    }, [meta])

    // 转换菜单配置为数组形式
    const menuItems = React.useMemo(() => {
        return Object.entries(menuConfig).map(([key, item]: [string, any]) => ({
            ...item,
            route: item.href || `/${locale}/${key}`,
            key
        }))
    }, [menuConfig, locale])

    // 关闭菜单的处理函数
    const handleCloseMenu = () => {
        setIsMenuOpen(false)
    }

    // 点击外部关闭菜单
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.getElementById('mobile-menu')
            if (nav && !nav.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuOpen])

    // 添加判断激活状态的函数
    const isMenuItemActive = React.useCallback((item: MenuItem) => {
        if (!asPath) return false;

        // 移除语言前缀和尾部斜杠进行比较
        const currentPath = asPath.replace(new RegExp(`^/${locale}`), '').replace(/\/$/, '');
        const itemPath = (item.href || item.route || '')
            .replace(new RegExp(`^/${locale}`), '')
            .replace(/\/$/, '');

        if (item.type === 'page') {
            // 页面类型需要精确匹配
            return currentPath === itemPath;
        } else if (item.type === 'menu') {
            // 菜单类型检查当前路径是否以菜单路径开头
            // 同时检查子项是否匹配
            if (currentPath.startsWith(itemPath)) {
                return true;
            }
            // 检查子项
            if (item.items) {
                return Object.entries(item.items).some(([key, subitem]) => {
                    const subitemPath = (subitem.href || `${itemPath}/${key}`).replace(/\/$/, '');
                    return currentPath === subitemPath;
                });
            }
        }
        return false;
    }, [asPath, locale]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gradient-to-r from-sprunki-pink-100 via-sprunki-purple-100 to-sprunki-blue-100 dark:border-gray-800/70">
                    {/* 顶部彩色条纹装饰 */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-sprunki-pink-500 via-sprunki-purple-500 to-sprunki-blue-500"></div>
                    
                    <div className="flex h-16 md:h-18 items-center">
                        {/* Logo 区域 */}
                        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8">
                            <Link
                                href={themeConfig?.features?.i18n ? `/${locale}` : '/'}
                                className="flex items-center gap-2"
                            >
                                <img 
                                    src={themeConfig?.logo?.image} 
                                    alt={themeConfig?.logo?.text} 
                                    className="w-auto" 
                                    style={{ height: themeConfig?.logo?.height }} 
                                />
                                <span className="text-lg md:text-xl font-bold sprunki-gradient-text-mixed-1">
                                    {themeConfig?.logo?.text}
                                </span>
                            </Link>
                        </div>

                        {/* 桌面端导航菜单 */}
                        <div className="hidden md:block flex-1 min-w-0">
                            <div className="scrollbar-hide">
                                <div className="flex justify-center min-w-max px-4">
                                    {menuItems.map((item: MenuItem, i) => {
                                        const isActive = isMenuItemActive(item);
                                        // 使用索引创建不同的颜色样式
                                        const colors = ['sprunki-pink', 'sprunki-blue', 'sprunki-purple', 'sprunki-mint'];
                                        const currentColor = colors[i % colors.length];

                                        if (item.type === 'menu' && item.items) {
                                            const submenuItems = Object.entries(item.items).map(([key, subitem]) => ({
                                                ...subitem,
                                                route: subitem.href || `${item.route}/${key}`,
                                                key
                                            }))

                                            return (
                                                <div key={item.route} className="relative group px-1 lg:px-2">
                                                    <button
                                                        className={`flex flex-col items-center justify-center h-16 md:h-20 px-2 lg:px-3 border-b-2 ${isActive
                                                            ? `border-${currentColor}-500 dark:border-${currentColor}-400 text-${currentColor}-500 dark:text-${currentColor}-400 font-medium`
                                                            : `border-transparent text-theme-text-secondary hover:text-${currentColor}-500 dark:hover:text-${currentColor}-400`
                                                            } transition-colors`}
                                                    >
                                                        {item.icon && (
                                                            <Icon icon={item.icon} className="w-5 h-5 lg:w-6 lg:h-6 mb-1.5" />
                                                        )}
                                                        <span className="text-xs lg:text-sm whitespace-nowrap">{item.title}</span>
                                                    </button>
                                                    {submenuItems.length > 0 && (
                                                        <div className="absolute left-1/2 -translate-x-1/2 w-56 mt-0 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ring-1 ring-sprunki-pink-200/40 dark:ring-gray-700 overflow-hidden">
                                                            {/* 子菜单顶部渐变装饰 */}
                                                            <div className="h-0.5 w-full bg-gradient-to-r from-sprunki-pink-500 via-sprunki-purple-500 to-sprunki-blue-500"></div>
                                                            
                                                            <div className="py-1">
                                                                {submenuItems.map((subitem, j) => (
                                                                    <Link
                                                                        key={subitem.key}
                                                                        href={subitem.href || subitem.route}
                                                                        className={`flex items-center px-4 py-2.5 text-sm text-theme-text-secondary hover:text-${colors[j % colors.length]}-500 dark:hover:text-${colors[j % colors.length]}-400 hover:bg-${colors[j % colors.length]}-50/30 dark:hover:bg-gray-700/50 transition-colors`}
                                                                    >
                                                                        {subitem.icon && (
                                                                            <Icon icon={subitem.icon} className="w-5 h-5 mr-2.5" />
                                                                        )}
                                                                        <span className="whitespace-nowrap">{subitem.title}</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }

                                        return (
                                            <Link
                                                key={item.key}
                                                href={item.href || item.route || ''}
                                                className={`flex flex-col items-center justify-center h-16 md:h-20 px-2 lg:px-3 mx-1 lg:mx-2 border-b-2 ${isActive
                                                    ? `border-${currentColor}-500 dark:border-${currentColor}-400 text-${currentColor}-500 dark:text-${currentColor}-400 font-medium`
                                                    : `border-transparent text-theme-text-secondary hover:text-${currentColor}-500 dark:hover:text-${currentColor}-400`
                                                    } transition-colors`}
                                            >
                                                {item.icon && (
                                                    <Icon icon={item.icon} className={`w-5 h-5 lg:w-6 lg:h-6 mb-1.5`} />
                                                )}
                                                <span className="text-xs lg:text-sm whitespace-nowrap">{item.title}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 功能区域 */}
                        <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 flex items-center">
                            {/* 移动端菜单按钮 */}
                            <div className="md:hidden mr-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsMenuOpen(!isMenuOpen)
                                    }}
                                    className="p-2 text-theme-text-secondary hover:text-sprunki-pink-500 dark:hover:text-sprunki-pink-400 transition-colors"
                                >
                                    <Icon
                                        icon={isMenuOpen ? "material-symbols:close" : "material-symbols:menu"}
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                <button className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 text-theme-text-secondary hover:text-sprunki-pink-500 dark:hover:text-sprunki-pink-400 transition-all">
                                    <Icon icon="material-symbols:search-outline" className="w-5 h-5" />
                                </button>
                                {themeEnabled && (
                                    <div className="p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50">
                                        <ThemeSwitch />
                                    </div>
                                )}
                                {i18nEnabled && (
                                    <div className="p-1 rounded-full bg-gray-100/50 dark:bg-gray-800/50">
                                        <LocaleSwitch />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 移动端菜单 */}
                    <div
                        id="mobile-menu"
                        className={`md:hidden fixed inset-x-0 top-16 bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="w-full overflow-x-auto pb-20">
                            <div className="px-4 py-2 space-y-1">
                                {menuItems.map((item: MenuItem, i) => {
                                    const isActive = isMenuItemActive(item);
                                    const colors = ['sprunki-pink', 'sprunki-blue', 'sprunki-purple', 'sprunki-mint'];
                                    const currentColor = colors[i % colors.length];

                                    if (item.type === 'menu' && item.items) {
                                        return (
                                            <div key={item.route} className="space-y-1">
                                                <div className={`flex items-center px-3 py-2 rounded-md bg-${currentColor}-50/30 dark:bg-gray-800/30 ${`text-${currentColor}-500 dark:text-${currentColor}-400`}`}>
                                                    {item.icon && (
                                                        <Icon icon={item.icon} className="w-5 h-5 mr-3" />
                                                    )}
                                                    <span className="whitespace-nowrap font-medium">{item.title}</span>
                                                </div>
                                                <div className="pl-8 space-y-1">
                                                    {Object.entries(item.items).map(([key, subitem], j) => {
                                                        const subColor = colors[j % colors.length];
                                                        return (
                                                            <Link
                                                                key={key}
                                                                href={subitem.href || `${item.route}/${key}`}
                                                                className={`flex items-center px-3 py-2 rounded-md text-sm text-theme-text-secondary hover:text-${subColor}-500 dark:hover:text-${subColor}-400 hover:bg-${subColor}-50/20 dark:hover:bg-gray-800/20`}
                                                                onClick={handleCloseMenu}
                                                            >
                                                                {subitem.icon && (
                                                                    <Icon icon={subitem.icon} className="w-4 h-4 mr-3" />
                                                                )}
                                                                <span className="whitespace-nowrap">{subitem.title}</span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href || item.route || ''}
                                            className={`flex items-center px-3 py-2 rounded-md ${isActive
                                                ? `bg-${currentColor}-50/30 dark:bg-gray-800/30 text-${currentColor}-500 dark:text-${currentColor}-400`
                                                : `text-theme-text-secondary hover:text-${currentColor}-500 dark:hover:text-${currentColor}-400 hover:bg-${currentColor}-50/20 dark:hover:bg-gray-800/20`
                                                } transition-colors`}
                                            onClick={handleCloseMenu}
                                        >
                                            {item.icon && (
                                                <Icon icon={item.icon} className="w-5 h-5 mr-3" />
                                            )}
                                            <span className="whitespace-nowrap">{item.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* 移动端功能区域 */}
                            <div className="fixed bottom-0 left-0 right-0 border-t border-sprunki-pink-100/20 dark:border-gray-700/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                                <div className="px-4 py-3 flex items-center justify-between">
                                    {i18nEnabled && <LocaleSwitch />}
                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 text-theme-text-secondary hover:text-sprunki-pink-500 dark:hover:text-sprunki-pink-400">
                                            <Icon icon="material-symbols:search-outline" className="w-5 h-5" />
                                        </button>
                                        {themeEnabled && <ThemeSwitch />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="mt-16 md:mt-18 bg-gradient-to-r from-sprunki-pink-50/30 via-white/30 to-sprunki-blue-50/30 dark:from-gray-900/30 dark:via-gray-900/30 dark:to-gray-900/30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                </div>
            </div>
        </>
    )
} 