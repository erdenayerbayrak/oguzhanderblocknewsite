'use client';

import { motion } from 'framer-motion';

const PartnersSection = () => {
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

  const partners = [
    {
      name: 'BingX',
      description: 'Kripto Borsası',
      logoSrc: '/images/bingx-logo.png',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Breakout Prop',
      description: 'Prop Trading Firm',
      logoSrc: '/images/breakout-logo.png',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#121152] via-[#38476b] to-[#ffc1ac]">
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
            İş Ortaklarımız
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Güvenilir ve köklü platformlarla işbirliği yaparak, size en iyi hizmeti sunuyoruz
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
            >
              {/* Logo Section */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-3`}>
                  <img 
                    src={partner.logoSrc} 
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Partner Info */}
              <div className="text-center">
                <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${partner.color} mb-2`}>
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-lg mb-4">
                  {partner.description}
                </p>
                
                {/* Description based on partner */}
                {partner.name === 'BingX' && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Güvenilir kripto para borsası olarak, yüksek likidite ve gelişmiş trading araçları sunuyor. 
                    Profesyonel trader'lar için ideal platform.
                  </p>
                )}
                
                {partner.name === 'Breakout Prop' && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Prop trading firması olarak, yetenekli trader'lara sermaye sağlıyor ve 
                    karlılık paylaşım modeli sunuyor.
                  </p>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${partner.color}`}></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${partner.color}`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={containerVariants}
          className="text-center mt-16"
        >
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Güçlü iş ortaklıklarımız sayesinde, trading deneyiminizi en üst seviyeye çıkarmanız için 
            gereken tüm araçlara ve desteğe sahip olursunuz.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;