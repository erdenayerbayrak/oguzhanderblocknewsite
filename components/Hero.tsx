'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #121152, #38476b, #ffc1ac, #b6192e)'
      }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Ticaret Potansiyelinizi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">
              Bugün Açığa Çıkarın
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Özel ticaret topluluğumuz, stratejinizi geliştirmeniz, tutarlı bir şekilde kârlı olmanız ve ticaret hedeflerinize ulaşmanız için ihtiyacınız olan mentorluğu ve rehberliği sağlar.
          </motion.p>
        </div>

        {/* Animated Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Profesyonel Mentorlik</h3>
            <p className="text-gray-300">
              Deneyimli traderlardan öğrenin ve stratejinizi güçlendirin. Kişiselleştirilmiş rehberlik ile hedeflerinize ulaşın.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Aktif Topluluk</h3>
            <p className="text-gray-300">
              Binlerce başarılı trader ile networkünüzü genişletin. Günlük analiz ve stratejileri paylaşın.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;