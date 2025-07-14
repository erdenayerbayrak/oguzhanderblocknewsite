'use client';

import { motion } from 'framer-motion';

const TeamSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="founder" className="py-20 bg-gradient-to-br from-[#121152] via-[#38476b] to-[#ffc1ac]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Kurucumuz
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Trading topluluğumuzun arkasındaki deneyimli trader ile tanışın
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex justify-center"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 max-w-md mx-auto"
          >
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-blue-600/20 flex items-center justify-center border-4 border-purple-500/30 overflow-hidden shadow-2xl">
                {/* CEO Profile Image */}
                <img 
                  src="/images/ceo.png" 
                  alt="OGUZHANDERBLOCK - Kurucu" 
                  className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback placeholder */}
                <div className="w-full h-full rounded-full bg-gray-700/50 flex items-center justify-center hidden">
                  <div className="text-4xl">👤</div>
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-2 rounded-full border-2 border-purple-500/20 animate-pulse"></div>
              <div className="absolute -inset-4 rounded-full border border-purple-500/10"></div>
              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>

            {/* Profile Info */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Kurucu / Trader
              </h3>
              <p className="text-purple-400 font-semibold text-lg mb-4">
                OGUZHANDERBLOCK
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="text-green-400 font-bold text-lg">%89.3</div>
                  <div className="text-gray-400 text-sm">Başarı Oranı</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-lg">3+ Yıl</div>
                  <div className="text-gray-400 text-sm">Deneyim</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Kripto ve forex piyasalarında 3+ yıllık deneyime sahip profesyonel trader. 
                Teknik analiz uzmanı ve risk yönetimi konusunda mentor. 
                Binlerce trader'a başarılı stratejiler öğretmiş ve topluluk kurucusu.
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  Forex
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  Kripto
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  Teknik Analiz
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  Mentoring
                </span>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://t.me/oguzhanderblock" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-blue-300 text-lg">📱</span>
                </a>
                <a 
                  href="https://instagram.com/oguzhanderblock" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-500/20 hover:bg-pink-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-pink-300 text-lg">📸</span>
                </a>
                <a 
                  href="https://youtube.com/@oguzhanderblock" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-red-300 text-lg">▶️</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;