'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video1: {
    src: '/videos/testimonial-1.mp4',
    poster: '',
    background: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop',
    title: 'Başarı Hikayesi Birinci',
    date: 'Trading Yolculuğu',
    scrollToExpand: 'Kaydırarak Genişlet',
    about: {
      overview: 'Sıfırdan trading öğrenen üyemizin ilk 3 ayda nasıl ₺25,000+ aylık kazanca ulaştığını öğrenin. Bu hikaye, doğru rehberlik ve disiplinli çalışmanın gücünü gözler önüne seriyor. CULT topluluğunun eğitim sisteminin etkinliğini kanıtlayan gerçek bir başarı hikayesi.',
      conclusion: 'ScrollExpandMedia component\'i interaktif scroll ile kullanıcı deneyimini geliştiren etkili bir yol sağlar. Video ve görsel modları arasında geçiş yaparak farklı implementasyonları görebilirsiniz.',
    },
  },
  video2: {
    src: '/videos/testimonial-2.mp4',
    poster: '',
    background: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1920&auto=format&fit=crop',
    title: 'Dönüşüm Hikayesi İkinci',
    date: 'Başarı Yolculuğu',
    scrollToExpand: 'Kaydırarak Genişlet',
    about: {
      overview: 'Daha önce farklı trading topluluklarında başarısız olan bir üyemizin CULT ile nasıl hayallerini gerçekleştirdiğini dinleyin. Sistematik yaklaşımımız ve kişiselleştirilmiş rehberlik sayesinde nasıl tutarlı karlılığa ulaştığını öğrenin.',
      conclusion: 'ScrollExpandMedia component\'i hem videolar hem de statik görsellerle mükemmel çalışır. Bu esneklik, içeriğinize en uygun medya tipini seçmenize olanak tanırken aynı etkileyici kullanıcı deneyimini korur.',
    },
  },
  video3: {
    src: '/videos/testimonial-3.mp4',
    poster: '',
    background: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1920&auto=format&fit=crop',
    title: 'Finansal Özgürlük Üçüncü',
    date: 'Zenginlik Yolculuğu',
    scrollToExpand: 'Kaydırarak Genişlet',
    about: {
      overview: 'Uzun vadeli yatırım stratejileri ve sabırlı yaklaşımın nasıl büyük kazançlara dönüştüğünü gözler önüne seren hikaye. 6 aylık bir süreçte nasıl finansal özgürlüğe ulaşıldığını ve trading\'i asıl meslek haline getirme sürecini keşfedin.',
      conclusion: 'Bu component modern ve interaktif bir şekilde video içeriğini sergilemek için mükemmeldir. Scroll ile genişleyen video deneyimi kullanıcıları büyüleyici bir deneyimle karşılar.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video1' | 'video2' | 'video3' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`mx-auto ${isMobile ? 'max-w-full px-2' : 'max-w-4xl'}`}>
      <h2 className={`font-bold mb-6 text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>
        {currentMedia.title} Hakkında
      </h2>
      <p className={`mb-8 text-white leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}>
        {currentMedia.about.overview}
      </p>

      <p className={`mb-8 text-white leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansion1 = () => {
  const mediaType = 'video1';
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion2 = () => {
  const mediaType = 'video2';
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion3 = () => {
  const mediaType = 'video3';
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Projects = () => {

  return (
    <section id="projects" className='min-h-screen'>
      {/* Video 1 */}
      <VideoExpansion1 />
      
      {/* Video 2 */}
      <VideoExpansion2 />
      
      {/* Video 3 */}
      <VideoExpansion3 />
    </section>
  );
};

export default Projects;