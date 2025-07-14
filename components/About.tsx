'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" ref={ref} className="py-20 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hakkımızda
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              10 yıldan fazla deneyimle, binlerce başarılı trader yetiştirdik. Bizim misyonumuz, 
              trading dünyasında sürdürülebilir başarı elde etmeniz için size en iyi araçları ve 
              stratejileri sunmak.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Profesyonel ekibimiz, market analizi, risk yönetimi ve psikolojik destek konularında 
              kapsamlı eğitimler sunar. Topluluğumuzda sadece teori değil, pratik deneyim de kazanırsınız.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">10+</div>
                <div className="text-gray-300">Yıl Deneyim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">5000+</div>
                <div className="text-gray-300">Başarılı Trader</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;