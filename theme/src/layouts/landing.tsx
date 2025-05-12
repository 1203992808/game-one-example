import * as React from 'react'
import type { LayoutProps } from '../types'
import { GameFrame } from '../components/GameFrame'

// 渲染图标的辅助函数
function renderIcon(icon: string | undefined) {
    if (!icon) return null;
    
    // 如果是 emoji (单个字符或以 : 开头结尾)
    if (icon.length === 2 || (icon.startsWith(':') && icon.endsWith(':'))) {
        return (
            <span className="text-3xl transform hover:scale-110 transition-transform">
                {icon.replace(/:/g, '')}
            </span>
        );
    }
    
    // 如果是 SVG 组件名称 (以大写字母开头)
    if (/^[A-Z]/.test(icon)) {
        return null;
    }
    
    // 默认作为图片 URL 处理
    return (
        <img src={icon} alt="" className="w-8 h-8 transform hover:scale-110 transition-transform" />
    );
}

export function LandingLayout({ children, frontMatter }: LayoutProps) {
    return (
        <main className="bg-gradient-to-b from-sprunki-pink-50/80 via-white to-sprunki-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative">
            {/* 全局背景装饰 */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-sprunki-pink-500/10 via-sprunki-purple-500/5 to-transparent rounded-bl-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-sprunki-blue-500/10 via-sprunki-mint-500/5 to-transparent rounded-tr-full -z-10"></div>
            
            {/* Hero Section */}
            <section className={`relative py-32 overflow-hidden ${frontMatter.hero?.background && !frontMatter.hero?.game ? '' : 'sprunki-gradient-bg-mixed-1'}`}>
                {frontMatter.hero?.background && !frontMatter.hero?.game && (
                    <div className="absolute inset-0">
                        <img 
                            src={frontMatter.hero.background} 
                            alt="" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white drop-shadow-lg ${frontMatter.hero?.game ? 'lg:text-6xl' : ''}`}>
                            {frontMatter.title}
                        </h1>
                        {frontMatter.description && (
                            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
                                {frontMatter.description}
                            </p>
                        )}
                        {frontMatter.hero?.game ? (
                            <div className="max-w-5xl mx-auto mb-12 sprunki-video-container-gradient">
                                <GameFrame 
                                    src={frontMatter.hero.game || ''}
                                    title={frontMatter.title || ''}
                                />
                            </div>
                        ) : (
                            <div className="flex gap-6 justify-center">
                                {frontMatter.cta && (
                                    <a href={frontMatter.cta.link} 
                                       className="sprunki-btn-primary-gradient inline-flex items-center">
                                        {frontMatter.cta.text}
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                )}
                                {frontMatter.secondaryCta && (
                                    <a href={frontMatter.secondaryCta.link}
                                       className="sprunki-glass inline-flex items-center px-8 py-3 rounded-full font-medium text-white hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-200">
                                        {frontMatter.secondaryCta.text}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 底部弧形装饰 */}
                <div className="absolute bottom-0 left-0 right-0 h-16">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
                        <path fill="#ffffff" fillOpacity="0.8" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,133.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            {frontMatter.stats && (
                <section className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {frontMatter.stats.items?.map((stat: any, index: number) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-sprunki-pink-400 via-sprunki-purple-400 to-sprunki-blue-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition-all"></div>
                                    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all shadow-lg">
                                        <div className="text-4xl font-bold sprunki-gradient-text-mixed-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-theme-text-secondary font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            {frontMatter.features && (
                <section className="py-24 bg-gradient-to-b from-white/80 to-sprunki-pink-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -left-64 top-1/3 w-96 h-96 bg-sprunki-blue-400/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -right-64 top-2/3 w-96 h-96 bg-sprunki-purple-400/10 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <h2 className="sprunki-heading-gradient">
                                {frontMatter.features.title}
                            </h2>
                            {frontMatter.features.description && (
                                <p className="text-xl text-theme-text-secondary max-w-3xl mx-auto">
                                    {frontMatter.features.description}
                                </p>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {frontMatter.features.items?.map((feature: any, index: number) => {
                                // 循环使用不同的卡片样式
                                const cardTypes = ['sprunki-feature-card', 'sprunki-feature-card-blue', 'sprunki-feature-card-purple', 'sprunki-feature-card-mint', 'sprunki-feature-card-gradient'];
                                const iconTypes = ['sprunki-feature-icon', 'sprunki-feature-icon-blue', 'sprunki-feature-icon-purple', 'sprunki-feature-icon-mint', 'sprunki-feature-icon-gradient'];
                                
                                const cardClass = cardTypes[index % cardTypes.length];
                                const iconClass = iconTypes[index % iconTypes.length];
                                
                                return (
                                    <div key={index} className={cardClass}>
                                        {feature.icon && (
                                            <div className={`w-16 h-16 bg-gradient-to-br from-sprunki-pink-500 via-sprunki-purple-500 to-sprunki-blue-500 rounded-lg flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform text-white ${index % 2 === 0 ? 'from-sprunki-pink-500 to-sprunki-purple-500' : 'from-sprunki-blue-500 to-sprunki-mint-500'}`}>
                                                {renderIcon(feature.icon)}
                                            </div>
                                        )}
                                        <h3 className={`text-xl font-semibold mb-4 ${index % 4 === 0 ? 'text-sprunki-pink-600 dark:text-sprunki-pink-300' : 
                                                                                       index % 4 === 1 ? 'text-sprunki-blue-600 dark:text-sprunki-blue-300' :
                                                                                       index % 4 === 2 ? 'text-sprunki-purple-600 dark:text-sprunki-purple-300' :
                                                                                                       'text-sprunki-mint-600 dark:text-sprunki-mint-300'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-theme-text-secondary">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Showcase Section */}
            {frontMatter.showcase && (
                <section className="py-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-sprunki-blue-400/10 rounded-full blur-3xl -z-10"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <h2 className="sprunki-heading-blue">
                                {frontMatter.showcase.title}
                            </h2>
                            {frontMatter.showcase.description && (
                                <p className="text-xl text-theme-text-secondary max-w-3xl mx-auto">
                                    {frontMatter.showcase.description}
                                </p>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {frontMatter.showcase.items?.map((item: any, index: number) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-sprunki-blue-400 via-sprunki-mint-400 to-sprunki-blue-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition-all"></div>
                                    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all shadow-lg">
                                        <img src={item.image} alt={item.title} className="w-full aspect-video object-cover" />
                                        <div className="p-6">
                                            <h3 className={`text-lg font-semibold mb-2 ${index % 3 === 0 ? 'text-sprunki-blue-600 dark:text-sprunki-blue-300' : 
                                                                                        index % 3 === 1 ? 'text-sprunki-mint-600 dark:text-sprunki-mint-300' :
                                                                                                        'text-sprunki-purple-600 dark:text-sprunki-purple-300'}`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-theme-text-secondary">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {frontMatter.faq && (
                <section className="py-24 bg-gradient-to-b from-white/90 to-sprunki-blue-50/80 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                    <div className="absolute -right-64 top-1/4 w-96 h-96 bg-sprunki-purple-400/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -left-64 bottom-1/4 w-96 h-96 bg-sprunki-mint-400/10 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16">
                            <h2 className="sprunki-heading-purple">
                                {frontMatter.faq.title}
                            </h2>
                            {frontMatter.faq.description && (
                                <p className="text-xl text-theme-text-secondary max-w-3xl mx-auto">
                                    {frontMatter.faq.description}
                                </p>
                            )}
                        </div>
                        <div className="max-w-3xl mx-auto space-y-6">
                            {frontMatter.faq.items?.map((item: any, index: number) => {
                                // 循环使用不同的边框颜色
                                const borderClasses = [
                                    'border-sprunki-pink-100 dark:border-gray-700',
                                    'border-sprunki-blue-100 dark:border-gray-700',
                                    'border-sprunki-purple-100 dark:border-gray-700',
                                    'border-sprunki-mint-100 dark:border-gray-700'
                                ];
                                
                                const titleClasses = [
                                    'text-sprunki-pink-600 dark:text-sprunki-pink-300',
                                    'text-sprunki-blue-600 dark:text-sprunki-blue-300',
                                    'text-sprunki-purple-600 dark:text-sprunki-purple-300',
                                    'text-sprunki-mint-600 dark:text-sprunki-mint-300'
                                ];
                                
                                return (
                                    <div key={index} className="relative group">
                                        <div className={`absolute -inset-0.5 ${index % 4 === 0 ? 'bg-gradient-to-r from-sprunki-pink-200 to-sprunki-pink-100' : 
                                                                               index % 4 === 1 ? 'bg-gradient-to-r from-sprunki-blue-200 to-sprunki-blue-100' :
                                                                               index % 4 === 2 ? 'bg-gradient-to-r from-sprunki-purple-200 to-sprunki-purple-100' :
                                                                                               'bg-gradient-to-r from-sprunki-mint-200 to-sprunki-mint-100'} 
                                                    rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-all`}></div>
                                        <div className="relative p-6 sprunki-glass rounded-lg shadow-md">
                                            <h3 className={`text-lg font-medium mb-2 ${titleClasses[index % 4]}`}>
                                                {item.question}
                                            </h3>
                                            <p className="text-theme-text-secondary">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Content Section */}
            <section className="py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative">
                <div className="absolute -left-64 bottom-0 w-96 h-96 bg-sprunki-pink-400/10 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert prose-img:rounded-xl 
                              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r 
                              prose-headings:from-sprunki-pink-600 prose-headings:to-sprunki-purple-600 
                              dark:prose-headings:from-sprunki-pink-400 dark:prose-headings:to-sprunki-purple-400">
                    {children}
                </div>
            </section>
        </main>
    )
} 