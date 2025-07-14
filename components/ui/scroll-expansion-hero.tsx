'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Video'nun ekranda görünme yüzdesini hesapla
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      // Video ekranın üst veya alt kısmından çıkıyorsa küçült
      if (sectionBottom < -100 || sectionTop > windowHeight + 100) {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
        return;
      }
      
      // Ekranın ortasında olduğunda en büyük olacak - optimize edilmiş hesaplama
      const viewportCenter = windowHeight * 0.5;
      const sectionCenter = sectionTop + sectionHeight * 0.5;
      const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
      const maxDistance = windowHeight * 0.8; // Daha erken büyümeye başla
      
      // Mesafeye göre progress hesapla (0-1 arası)
      let progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
      
      // Progress'i yumuşat (easing) - daha smooth
      progress = Math.pow(progress, 1.2);
      
      setScrollProgress(progress);
      
      // Content görünürlüğü
      if (progress > 0.7) {
        setShowContent(true);
        setMediaFullyExpanded(true);
      } else {
        setShowContent(false);
        setMediaFullyExpanded(false);
      }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mobil ve desktop için optimize edilmiş boyutlar
  const baseWidth = isMobileState ? 320 : 400;
  const baseHeight = isMobileState ? 180 : 250;
  const maxWidthIncrease = isMobileState ? window.innerWidth - 40 : 1200;
  const maxHeightIncrease = isMobileState ? window.innerHeight * 0.6 : 600;
  
  const mediaWidth = baseWidth + scrollProgress * maxWidthIncrease;
  const mediaHeight = baseHeight + scrollProgress * maxHeightIncrease;
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-all duration-300 ease-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <div className='absolute inset-0 z-0 h-full bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460]' />

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: isMobileState ? '95vw' : scrollProgress > 0.8 ? '95vw' : '90vw',
                  maxHeight: isMobileState ? '80vh' : scrollProgress > 0.8 ? '90vh' : '75vh',
                  boxShadow: `0px 0px ${20 + scrollProgress * 30}px rgba(0, 0, 0, ${0.2 + scrollProgress * 0.3})`,
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: Math.max(0.1, 0.6 - scrollProgress * 0.5) }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: Math.max(0.1, 0.6 - scrollProgress * 0.5) }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: Math.max(0.2, 0.6 - scrollProgress * 0.4) }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-all duration-300 ease-out'>
                  {date && (
                    <p
                      className={`${isMobileState ? 'text-lg' : 'text-2xl'} text-blue-200 transition-all duration-300 ease-out`}
                      style={{ 
                        transform: `translateX(-${textTranslateX * (isMobileState ? 0.5 : 1)}vw)`,
                        opacity: 1 - scrollProgress * 0.3
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && scrollProgress < 0.7 && (
                    <p
                      className={`text-blue-200 font-medium text-center transition-all duration-300 ease-out ${isMobileState ? 'text-sm' : 'text-base'}`}
                      style={{ 
                        transform: `translateX(${textTranslateX * (isMobileState ? 0.5 : 1)}vw)`,
                        opacity: Math.max(0, 1 - scrollProgress * 2)
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-all duration-300 ease-out flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className={`${isMobileState ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-blue-200 transition-all duration-300 ease-out`}
                  style={{ 
                    transform: `translateX(-${textTranslateX * (isMobileState ? 0.3 : 1)}vw)`,
                    opacity: Math.max(0.3, 1 - scrollProgress * 0.4)
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className={`${isMobileState ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-center text-blue-200 transition-all duration-300 ease-out`}
                  style={{ 
                    transform: `translateX(${textTranslateX * (isMobileState ? 0.3 : 1)}vw)`,
                    opacity: Math.max(0.3, 1 - scrollProgress * 0.4)
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className={`flex flex-col w-full transition-all duration-500 ease-out ${isMobileState ? 'px-4 py-6' : 'px-8 py-10 md:px-16 lg:py-20'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 30
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;