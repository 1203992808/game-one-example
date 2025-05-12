import React from 'react'
import { Icon } from '@iconify/react'
import { CuteElement } from './CuteElement'

interface GameFrameProps {
    src: string;
    title: string;
    cover?: string;
}

export function GameFrame({ src, title, cover }: GameFrameProps) {
    const [key, setKey] = React.useState(0);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [showTip, setShowTip] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);

    const handleReload = () => {
        setKey(prev => prev + 1);
    };

    const handlePlay = () => {
        setIsLoaded(true);
    };

    const handleFullscreen = async () => {
        if (!iframeRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await iframeRef.current.requestFullscreen();
                setIsFullscreen(true);
                setShowTip(true);
                setTimeout(() => setShowTip(false), 3000);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Error attempting to enable fullscreen:', err);
        }
    };

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <div className="flex flex-col w-full bg-theme-bg-primary dark:bg-dark-secondary backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-theme-border relative">
            {/* Cute decorative elements */}
            <CuteElement 
              type="star" 
              animation="pulse" 
              position="-top-3 -right-3 z-20" 
              color="text-yellow-400" 
              size="w-6 h-6" 
            />
            <CuteElement 
              type="star" 
              animation="pulse" 
              position="-bottom-3 -left-3 z-20" 
              color="text-sprunki-pink-400" 
              size="w-6 h-6" 
              delay={2}
            />
            <CuteElement 
              type="note" 
              animation="bounce" 
              position="-top-3 left-12 z-20" 
              color="text-sprunki-mint-400" 
              delay={1}
            />
            <CuteElement 
              type="icon" 
              animation="wiggle" 
              position="-bottom-2 right-12 z-20" 
              color="text-sprunki-blue-400" 
              icon="game-icons:music-spell"
              delay={2}
            />
            
            <div className="relative w-full aspect-[16/10] bg-dark-secondary">
                {!isLoaded ? (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                        onClick={handlePlay}
                    >
                        {cover ? (
                            <img
                                src={cover}
                                alt={`${title} cover`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src="/default-cover.jpg"
                                alt="Default cover"
                                className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="relative">
                                <Icon
                                    icon="material-symbols:play-circle"
                                    className="w-20 h-20 text-white hover:text-primary-500 transition-colors"
                                />
                                {/* Floating notes around play button */}
                                <CuteElement 
                                  type="note" 
                                  animation="float" 
                                  position="-top-6 -left-6" 
                                  color="text-sprunki-pink-300" 
                                  size="w-6 h-6" 
                                />
                                <CuteElement 
                                  type="note" 
                                  animation="float" 
                                  position="-bottom-6 -right-6" 
                                  color="text-sprunki-blue-300" 
                                  size="w-6 h-6" 
                                  delay={2}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <iframe
                            ref={iframeRef}
                            key={key}
                            src={src}
                            title={title}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        {showTip && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                                Press ESC to exit fullscreen
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-theme-border">
                <div className="flex items-center gap-2">
                    {cover && (
                        <img src={cover} alt={`${title} cover`} className="w-8 h-8 rounded-lg object-cover" />
                    )}
                    <h2 className="text-base font-medium text-theme-text-primary">{title}</h2>
                </div>
                <div className="flex items-center gap-1">
                    {isLoaded && (
                        <>
                            <button
                                onClick={handleReload}
                                className="p-2 text-theme-text-secondary hover:text-primary-500 hover:bg-theme-bg-secondary rounded-lg transition-colors"
                                title="Reload"
                            >
                                <Icon icon="material-symbols:refresh" className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleFullscreen}
                                className="p-2 text-theme-text-secondary hover:text-primary-500 hover:bg-theme-bg-secondary rounded-lg transition-colors"
                                title="Fullscreen"
                            >
                                <Icon icon={isFullscreen ? "material-symbols:fullscreen-exit" : "material-symbols:fullscreen"} className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}