import React from 'react';
import type { PageMapItem } from 'nextra';
import { Breadcrumb } from '../components/Breadcrumb';
import { GameCarousel } from '../components/GameCarousel';
import { GameFrame } from '../components/GameFrame';
import { useRouter } from 'nextra/hooks';
import { getGamesByCategory } from '../utils/getGamesByCategory';
import type { FrontMatter } from '../types';
import { Icon } from '@iconify/react';

interface FeaturedLayoutProps {
    children: React.ReactNode;
    frontMatter: FrontMatter;
    pageMap: PageMapItem[];
}

export function FeaturedLayout({ children, frontMatter, pageMap }: FeaturedLayoutProps) {
    const router = useRouter();
    const { locale = 'en' } = router;

    // 获取特色分类的游戏
    const getFeaturedGames = (category: string) => {
        const games = getGamesByCategory(pageMap, category, locale);
        return games.slice(0, 20); // 只取前20个游戏
    };

    // 从路径获取分类名称
    const getCategoryTitle = (path: string) => {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        return lastPart
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // 从 frontMatter 中获取分类列表
    const categories = frontMatter.categories || [];

    return (
        <main className="min-h-screen bg-gradient-to-r from-sprunki-pink-50/90 via-white via-sprunki-purple-50/30 to-sprunki-mint-50/90 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 relative">
            {/* Decorative elements - enhance these for more sophisticated gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-sprunki-pink-100/20 via-sprunki-pink-50/10 to-transparent -z-10"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-sprunki-mint-100/20 via-sprunki-blue-50/10 to-transparent -z-10"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-sprunki-purple-100/5 via-white/50 to-sprunki-blue-100/5 blur-3xl -z-10 rounded-full"></div>
            
            {/* Cute decorative elements */}
            <div className="absolute top-24 left-12 w-12 h-12 bg-sprunki-pink-200 rounded-full opacity-60 cute-float"></div>
            <div className="absolute top-48 left-16 w-8 h-8 bg-sprunki-mint-200 rounded-full opacity-60 cute-float-delay-1"></div>
            <div className="absolute top-96 left-8 w-10 h-10 bg-sprunki-blue-200 rounded-full opacity-60 cute-float-delay-2"></div>
            <div className="absolute top-40 right-12 w-12 h-12 bg-sprunki-purple-200 rounded-full opacity-60 cute-float-delay-3"></div>
            <div className="absolute top-64 right-16 w-8 h-8 bg-sprunki-mint-300 rounded-full opacity-60 cute-float"></div>
            <div className="absolute bottom-40 right-20 w-10 h-10 bg-sprunki-pink-300 rounded-full opacity-60 cute-float-delay-1"></div>
            
            {/* Cute icons */}
            <div className="absolute top-36 left-32 -z-5 text-sprunki-pink-400 opacity-80 cute-bounce">
                <Icon icon="game-icons:musical-notes" className="w-10 h-10" />
            </div>
            <div className="absolute top-72 right-36 -z-5 text-sprunki-blue-400 opacity-80 cute-bounce-delay-1">
                <Icon icon="game-icons:musical-score" className="w-10 h-10" />
            </div>
            <div className="absolute bottom-32 left-40 -z-5 text-sprunki-mint-400 opacity-80 cute-bounce-delay-2">
                <Icon icon="game-icons:musical-keyboard" className="w-10 h-10" />
            </div>
            
            {/* Animated cute cloud */}
            <div className="absolute top-16 right-48 -z-5 opacity-60 cute-float-fast">
                <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 28C62 34.6274 53.9411 40 44 40C34.0589 40 26 34.6274 26 28C26 21.3726 34.0589 16 44 16C44.6906 16 45.3701 16.0333 46.0352 16.0975C46.0352 16.0975 46 15.5 46 15C46 9.47715 49.5817 5 54 5C58.4183 5 62 9.47715 62 15C62 16.1047 61.8213 17.1683 61.487 18.1623C61.8213 18.7344 62 19.3527 62 20C62 22.7614 59.7614 25 57 25C56.9369 25 56.874 24.9983 56.8115 24.9948C60.0571 25.549 62 26.7176 62 28Z" fill="white"/>
                </svg>
            </div>
            <div className="absolute top-80 left-16 -z-5 opacity-60 cute-float-delay-2">
                <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 28C62 34.6274 53.9411 40 44 40C34.0589 40 26 34.6274 26 28C26 21.3726 34.0589 16 44 16C44.6906 16 45.3701 16.0333 46.0352 16.0975C46.0352 16.0975 46 15.5 46 15C46 9.47715 49.5817 5 54 5C58.4183 5 62 9.47715 62 15C62 16.1047 61.8213 17.1683 61.487 18.1623C61.8213 18.7344 62 19.3527 62 20C62 22.7614 59.7614 25 57 25C56.9369 25 56.874 24.9983 56.8115 24.9948C60.0571 25.549 62 26.7176 62 28Z" fill="white"/>
                </svg>
            </div>
            
            {/* Star decorations */}
            <div className="absolute top-24 right-24 -z-5 text-sprunki-pink-300 opacity-80 cute-pulse">
                <Icon icon="ph:star-fill" className="w-6 h-6" />
            </div>
            <div className="absolute top-48 left-36 -z-5 text-sprunki-blue-300 opacity-80 cute-pulse">
                <Icon icon="ph:star-fill" className="w-4 h-4" />
            </div>
            <div className="absolute bottom-48 right-32 -z-5 text-sprunki-mint-300 opacity-80 cute-pulse">
                <Icon icon="ph:star-fill" className="w-5 h-5" />
            </div>
            
            {/* 头部区域 */}
            <div className="max-w-5xl mx-auto px-4 py-6 relative">
                {frontMatter.game && (
                    <div className="mb-6 sprunki-video-container-gradient relative">
                        {/* Decorative elements for game container */}
                        <div className="absolute -top-4 -left-4 z-10 text-sprunki-pink-400 opacity-90 cute-wiggle">
                            <Icon icon="game-icons:headphones" className="w-8 h-8" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 z-10 text-sprunki-mint-400 opacity-90 cute-wiggle">
                            <Icon icon="game-icons:music-spell" className="w-8 h-8" />
                        </div>
                        <GameFrame
                            src={frontMatter.game}
                            title={frontMatter.title || 'Game'}
                            cover={frontMatter.cover}
                        />
                    </div>
                )}

                {/* MDX 内容 */}
                <div className="mt-8 relative">
                    {/* Decorative elements around content box */}
                    <div className="absolute -top-6 left-10 z-10 text-sprunki-blue-400 opacity-80 cute-bounce">
                        <Icon icon="game-icons:musical-notes" className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-6 right-10 z-10 text-sprunki-pink-400 opacity-80 cute-bounce-delay-1">
                        <Icon icon="game-icons:musical-score" className="w-8 h-8" />
                    </div>
                    <div className="prose dark:prose-invert prose-slate max-w-none
                                    lg:px-8 pt-6 pb-10 
                                    bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
                                    rounded-xl
                                    relative z-10 overflow-hidden">
                        
                        {/* 背景装饰 */}
                        <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-sprunki-mint-100/40 to-transparent rounded-bl-full -z-10"></div>
                        <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-sprunki-pink-100/40 to-transparent rounded-tr-full -z-10"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-gradient-to-r from-sprunki-pink-50/10 via-white/0 to-sprunki-blue-50/10 blur-xl -z-10"></div>
                        
                        {frontMatter.title && frontMatter.description && (
                            <div className="mb-10 pb-8 border-b border-gradient-to-r from-sprunki-pink-100 via-sprunki-purple-100 to-sprunki-blue-100 dark:border-gray-700/50 relative">
                                {/* Title decoration */}
                                <div className="absolute -top-2 -left-2 z-10 text-sprunki-purple-400 opacity-90 cute-spin-slow">
                                    <Icon icon="game-icons:three-leaves" className="w-6 h-6" />
                                </div>
                                <h1 className="!mt-0 sprunki-gradient-text-mixed-1">{frontMatter.title}</h1>
                                <p className="text-lg text-gray-500 dark:text-gray-400 italic mt-3 !mb-0">
                                    {frontMatter.description}
                                </p>
                            </div>
                        )}
                        
                        <article className="nextra-body relative w-full">
                            {children}
                        </article>
                        
                        {/* 页面底部装饰 */}
                        <div className="absolute bottom-3 right-6 opacity-10">
                            <Icon icon="carbon:game-console" className="w-24 h-24 text-sprunki-purple-500" />
                        </div>
                    </div>
                    
                    {/* 边框渐变效果 */}
                    <div className="absolute top-3 -left-3 -right-3 bottom-3 -z-10 rounded-xl p-[1px] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-sprunki-pink-200/30 via-sprunki-purple-200/20 to-sprunki-mint-200/30 rounded-xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-sprunki-pink-100/20 via-sprunki-blue-100/10 to-sprunki-mint-100/20 rounded-lg blur-2xl"></div>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
                    </div>
                </div>
                
                {/* 底部按钮区域 */}
                {frontMatter.game && (
                    <div className="mt-8 flex justify-center gap-4 relative">
                        <div className="absolute -top-6 left-1/3 z-10 text-sprunki-mint-400 opacity-80 cute-bounce-delay-2">
                            <Icon icon="game-icons:star-formation" className="w-8 h-8" />
                        </div>
                        <a href="#" className="sprunki-btn-primary-blue relative">
                            Play Now
                            <span className="absolute -top-2 -right-2 text-yellow-400 cute-pulse">
                                <Icon icon="ph:star-fill" className="w-4 h-4" />
                            </span>
                        </a>
                        <a href="#" className="sprunki-btn-secondary relative">
                            Learn More
                            <span className="absolute -bottom-2 -right-2 text-sprunki-pink-400 cute-pulse">
                                <Icon icon="ph:star-fill" className="w-4 h-4" />
                            </span>
                        </a>
                    </div>
                )}
            </div>
        </main>
    );
} 